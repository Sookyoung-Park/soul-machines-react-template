import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Color from 'color';
import { Link } from 'react-router-dom';
import breakpoints from '../utils/breakpoints';
import { landingBackgroundColor } from '../config';
import micFill from '../img/mic-fill.svg';
import videoFill from '../img/camera-video-fill.svg';
import {
  setNextChatType,
} from '../store/sm';

function NextConversation({ className }) {
  const { user } = useSelector(({ sm }) => ({ ...sm }));
  const { chatType } = user.chatType;

  const dispatch = useDispatch();

  // onclick event for change chatType
  const handleChatTypeChange = () => {
    dispatch(setNextChatType());
    console.log('new chatType', chatType);
  };

  return (
    <div className={className}>
      <div className="landing-wrapper">
        <div className="row justify-content-center">
          {' '}
          {/* 좌우 가운데 정렬 */}
          <div className="col-auto">
            {' '}
            {/* col-auto를 사용하여 버튼의 너비를 자동으로 조정 */}
            <Link
              to="/landingafter"
              className="shadow btn primary-accent fs-3"
              type="button"
              onClick={() => handleChatTypeChange()}
            >
              Chat with Next Avatar
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}

NextConversation.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(NextConversation)`
  .landing-wrapper {
    min-height: 100vh;

    background-size: auto 60%;
    background-repeat: no-repeat;
    background-position: bottom center;

    @media (min-width: ${breakpoints.lg}px) {
      background-size: 60% auto;
      background-position: right bottom;
    }
  }
  .landing-container {
    padding-top: 1rem;
    display: flex;
    justify-content: center;

    &>div {
      background-color: ${Color(landingBackgroundColor).alpha(0.5)};
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0,0,0,0.1);
      padding: 1rem;
      border-radius: 5px;
      text-align: center;

      @media (min-width: ${breakpoints.lg}px) {
        border: none;
      }
    }
  }
  .form-switch .form-check-input {
    min-width: 7rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

  .form-check.selected {
    background-color:  #0062ff; /* 선택된 상태의 배경색을 원하는 색상으로 지정하세요. */
    color: #0062ff; /* 선택된 상태의 텍스트 색상을 원하는 색상으로 지정하세요. */
    border-radius: 50%; /* 동그라미 형태로 만들기 */
    padding: 5px; /* 여백 추가 */
  }


    &.mic-switch::before, &.mic-switch.status-checked::after {
        background-image: url(${micFill});
    }
    &.video-switch::before, &.video-switch.status-checked::after {
        background-image: url(${videoFill});
    }
    &.mic-switch.status-checked::before, &.video-switch.status-checked::before {
      background-image: none;
    }

    &.status-unchecked {
      &::after {
        content: 'OFF';
        color: #000;
        margin-right: 18%;
      }
      &::before {
        background-size: 60%;
        background-repeat: no-repeat;
        background-color: rgb(220, 220, 220);
        background-position: 45% center;
        content: '';
        display: block;

        border-radius: 50%;

        height: 80%;
        margin-left: 5%;
        aspect-ratio: 1;
        float: right;
      }
    }

    &.status-checked {
      &::before {
        content: 'ON';
        color: #FFF;
        margin-left: 22%;
      }

      &::after {
        background-size: 60%;
        background-repeat: no-repeat;
        background-color: #FFF;
        background-position: 55% center;
        content: '';
        display: block;

        border-radius: 50%;

        height: 80%;
        margin-right: 5%;
        aspect-ratio: 1;
        float: right;
      }
    }
  }
  .row{
    margin-top: 160px;
    justify-content: center;
  }

`;
