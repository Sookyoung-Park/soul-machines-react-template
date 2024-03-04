import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  CameraVideoFill,
  CameraVideoOffFill,
  ChatSquareTextFill,
  MicFill,
  MicMuteFill,
  VolumeMuteFill,
  VolumeUpFill,
} from 'react-bootstrap-icons';
import ReactTooltip from 'react-tooltip';
import {
  setShowTranscript,
  disconnect,
  setOutputMute,
  setMicOn,
  setCameraOn,
} from '../store/sm/index';
import mic from '../img/mic.svg';
import micFill from '../img/mic-fill.svg';
import breakpoints from '../utils/breakpoints';
import { primaryAccent } from '../globalStyle';
import FeedbackModal from './FeedbackModal';

const volumeMeterHeight = 24;
const volumeMeterMultiplier = 1.2;
const smallHeight = volumeMeterHeight;
const largeHeight = volumeMeterHeight * volumeMeterMultiplier;

function Controls({
  className,
}) {
  const {
    micOn,
    cameraOn,
    isOutputMuted,
    showTranscript,
    transcript,
    requestedMediaPerms,
    highlightMic,
    highlightMute,
    highlightChat,
    highlightCamera,
  } = useSelector((state) => ({ ...state.sm }));

  const { user } = useSelector(({ sm }) => ({ ...sm }));
  const { chatType } = user.chatType;

  const dispatch = useDispatch();

  const [showFeedback, setShowFeedback] = useState(false);
  // track 2min for test=> show Exit Conversation
  const [showExitButton, setShowExitButton] = useState(false);
  const history = useHistory();

  // bind transcrpt open and mute func to each other, so that
  // when we open the transcript we mute the mic
  const toggleKeyboardInput = () => {
    dispatch(setShowTranscript(!showTranscript));
    dispatch(setMicOn({ micOn: showTranscript }));
  };

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  // 2min after timeout => show ExitSession Button
  // 2 min = 120000
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowExitButton(true);
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // redirect to feedback page after 3min 30sec
  // 3min30sec = 210000
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(disconnect());
      // next-conversation
      if (chatType === 'E') {
        history.push('/feedback');
      } else {
        history.push('/next-conversation');
      }
      // history.push('/feedback');
      // test
    }, 1500000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, history]);

  const iconSize = 24;

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
          {/* mute dp sound */}
          <button
            type="button"
            className="control-icon"
            aria-label="Toggle DP Audio"
            data-tip="Toggle DP Audio"
            onClick={() => dispatch(setOutputMute({ isOutputMuted: !isOutputMuted }))}
          >
            {isOutputMuted ? (
              <VolumeMuteFill size={iconSize} style={{ border: highlightMute ? 'red 2px solid' : '' }} />
            ) : (
              <VolumeUpFill size={iconSize} color={primaryAccent} style={{ border: highlightMute ? 'red 2px solid' : '' }} />
            )}
          </button>
          {/* show transcript */}
          <button
            type="button"
            className="control-icon"
            aria-label="Toggle Transcript"
            data-tip="Toggle Transcript"
            onClick={toggleKeyboardInput}
            disabled={transcript.length <= 0}
          >
            <ChatSquareTextFill
              size={iconSize}
              color={showTranscript ? primaryAccent : '#B3B3B3'}
              style={{ border: highlightChat ? 'red 2px solid' : '' }}
            />
          </button>
        </div>
        <div>
          {/* toggle user mic */}
          <button
            type="button"
            className="control-icon"
            aria-label="Toggle Microphone"
            data-tip="Toggle Microphone"
            disabled={requestedMediaPerms.micDenied === true}
            onClick={() => dispatch(setMicOn({ micOn: !micOn }))}
          >
            {micOn ? (
              <MicFill size={iconSize} color={primaryAccent} style={{ border: highlightMic ? 'red 2px solid' : '' }} />
            ) : (
              <MicMuteFill size={iconSize} style={{ border: highlightMic ? 'red 2px solid' : '' }} />
            )}
          </button>
        </div>
        <div>
          {/* toggle user camera */}
          <button
            type="button"
            className="control-icon"
            aria-label="Toggle Camera"
            data-tip="Toggle Camera"
            disabled={requestedMediaPerms.cameraDenied === true}
            onClick={() => dispatch(setCameraOn({ cameraOn: !cameraOn }))}
          >
            {cameraOn ? (
              <CameraVideoFill
                size={iconSize}
                color={primaryAccent}
                style={{ border: highlightCamera ? 'red 2px solid' : '' }}
              />
            ) : (
              <CameraVideoOffFill size={iconSize} style={{ border: highlightCamera ? 'red 2px solid' : '' }} />
            )}
          </button>
        </div>
        {showExitButton && (
        <button
          type="button"
          className="btn btn-dark connected-button"
          onClick={() => {
            dispatch(disconnect());
            history.push('/next-conversation');
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
