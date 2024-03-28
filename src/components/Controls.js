import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { disconnect, setNextChatType } from '../store/sm/index';
import mic from '../img/mic.svg';
import micFill from '../img/mic-fill.svg';
import breakpoints from '../utils/breakpoints';
import FeedbackModal from './FeedbackModal';

const volumeMeterHeight = 24;
const volumeMeterMultiplier = 1.2;
const smallHeight = volumeMeterHeight;
const largeHeight = volumeMeterHeight * volumeMeterMultiplier;

function Controls({
  className,
}) {
  const { user } = useSelector(({ sm }) => ({ ...sm }));
  const { chatType } = user.chatType;
  const { chatPrompts } = user;
  console.log(chatPrompts, chatType);

  let prompt;
  if (chatType === 'A') {
    prompt = chatPrompts.A;
  }
  if (chatType === 'B') {
    prompt = chatPrompts.B;
  }
  if (chatType === 'C') {
    prompt = chatPrompts.C;
  }
  if (chatType === 'D') {
    prompt = chatPrompts.D;
  }

  console.log('prompt:', prompt);

  const [showFeedback, setShowFeedback] = useState(false);
  const [showExitButton, setShowExitButton] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  // 2min after timeout => show ExitSession Button
  // 2Min 30 sec = 150000
  // test
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowExitButton(true);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleChatTypeChange = () => {
    dispatch(setNextChatType());
  };

  // redirect to feedback page after 3min 30sec
  // 4min
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(disconnect());
      handleChatTypeChange();
      if (chatType === 'E') {
        history.push('/ps1');
      } else {
        history.push('/landingafter');
      }
    }, 240000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, history]);

  return (
    <div className={className}>
      {showFeedback ? (
        <div className="alert-modal">
          <div className="alert-modal-card container">
            <FeedbackModal
              onClose={() => {
                setShowFeedback(false);
              }}
              closeText="Resume Conversation"
              denyFeedbackText="Close"
              denyFeedback={() => {
                setShowFeedback(false);
              }}
            />
          </div>
        </div>
      ) : null}
      <div className="d-flex">
        <div>
          <h5 style={{ marginTop: '45px', marginRight: '24px', color: '#ffffff' }}>
            Prompt:
            {' '}
            {prompt}
          </h5>
        </div>
        {showExitButton && (
        <button
          type="button"
          className="btn btn-light connected-button"
          style={{ marginTop: '36px' }}
          onClick={() => {
            dispatch(disconnect());
            handleChatTypeChange();
            history.push('/landingafter');
          }}
        >
          Exit Conversation
        </button>
        )}
      </div>
    </div>
  );
}

Controls.propTypes = { className: PropTypes.string.isRequired };

export default styled(Controls)`
  .context-controls {
    position: absolute;
    z-index: 100;
    background: rgba(0,0,0,0.3);
    left: 0;
    top: 0;

    &>div {
      width: 100vw;
      height: 100vh;

      margin-top: 4rem;
    }

    ul {
      padding: 1rem;

      list-style-type: none;

      background: #FFF;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;

      &>li {
        border-bottom: 1px solid rgba(0,0,0,0.4);
        padding: 0.5rem;
      }
      &>li:last-child {
        border: none;
        padding-bottom: 0;
      }
    }
  }
  .context-controls-trigger {
    position: relative;
    border: 1px solid red;
    z-index: 105;
  }
  .control-icon {
    border: none;
    background: none;

    padding: .4rem;
  }
  .form-control {
    opacity: 0.8;
    &:focus {
      opacity: 1;
    }
  }

  .interrupt {
    opacity: 1;
    transition: opacity 0.1s;
  }
  .interrupt-active {
    opacity: 0;
  }

  .volume-display {
    position: relative;
    top: ${volumeMeterHeight * 0.5}px;
    display: flex;
    align-items: flex-end;
    justify-content: start;
    min-width: ${({ videoWidth }) => (videoWidth <= breakpoints.md ? 21 : 32)}px;
    .meter-component {
      /* don't use media queries for this since we need to write the value
      in the body of the component */
      height: ${({ videoWidth }) => (videoWidth >= breakpoints.md ? largeHeight : smallHeight)}px;
      background-size: ${({ videoWidth }) => (videoWidth >= breakpoints.md ? largeHeight : smallHeight)}px;
      background-position: bottom;
      background-repeat: no-repeat;
      min-width: ${({ videoWidth }) => (videoWidth <= breakpoints.md ? 21 : 28)}px;
      position: absolute;
    }
    .meter-component-1 {
      background-image: url(${mic});
      z-index: 10;
    }
    .meter-component-2 {
      background-image: url(${micFill});
      z-index: 20;
    }
  }
  .alert-modal {
    position: absolute;
    z-index: 1000;
    display: flex;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    background: rgba(0,0,0,0.3);
  }
  .alert-modal-card {
    background: #FFF;
    padding: 1.3rem;
    border-radius: 5px;
  }


`;
