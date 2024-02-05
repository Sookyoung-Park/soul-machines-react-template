import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Color from 'color';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CameraVideoFill, MicFill } from 'react-bootstrap-icons';
import breakpoints from '../utils/breakpoints';
import { landingBackgroundColor } from '../config';
import {
  setRequestedMediaPerms, setChatTypeState, setApiKeysState,
} from '../store/sm';
import micFill from '../img/mic-fill.svg';
import videoFill from '../img/camera-video-fill.svg';

function LandingAfter({ className }) {
  const { user } = useSelector(({ sm }) => ({ ...sm }));
  const { chatType } = user.chatType;
  const { gender, race } = user.info;
  const { mic, camera } = useSelector(({ sm }) => sm.requestedMediaPerms);

  const dispatch = useDispatch();

  // api key condition
  const API_EA_MALE = process.env.REACT_APP_API_KEY_EA_MALE;
  const API_EA_FEMALE = process.env.REACT_APP_API_KEY_EA_FEMALE;
  const API_AF_MALE = process.env.REACT_APP_API_KEY_AF_MALE;
  const API_AF_FEMALE = process.env.REACT_APP_API_KEY_AF_FEMALE;
  const API_CS_MALE = process.env.REACT_APP_API_KEY_CS_MALE;
  const API_CS_FEMALE = process.env.REACT_APP_API_KEY_CS_FEMALE;

  // infoString : EA_FEMALE, AF_MALE etc
  const infoString = `_${race}_${gender}`;
  console.log('info string : ', infoString);
  console.log('landingAfter chatType : ', chatType);

  let apiA;
  let apiB;
  let apiC;
  let apiD;

  function getRandomApiKey(api1, api2) {
    const randomIndex = Math.random() < 0.5 ? 0 : 1;
    return randomIndex === 0 ? api1 : api2;
  }

  // api allocation logic
  // ApiKey_A = same race, same gender
  // ApiKey_B = different race, same gender
  // ApiKey_C = different race, different gender
  // ApiKey_D = same race, different gender
  switch (infoString) {
    case '_EA_MALE':
      apiA = API_EA_MALE;
      apiB = getRandomApiKey(API_AF_MALE, API_CS_MALE);
      apiC = getRandomApiKey(API_AF_FEMALE, API_CS_FEMALE);
      apiD = API_EA_FEMALE;
      break;
    case '_EA_FEMALE':
      apiA = process.env.REACT_APP_API_KEY_EA_FEMALE;
      apiB = getRandomApiKey(API_AF_FEMALE, API_CS_FEMALE);
      apiC = getRandomApiKey(API_AF_MALE, API_CS_MALE);
      apiD = API_EA_MALE;
      break;
    case '_AF_MALE':
      apiA = process.env.REACT_APP_API_KEY_AF_MALE;
      apiB = getRandomApiKey(API_EA_MALE, API_CS_MALE);
      apiC = getRandomApiKey(API_EA_FEMALE, API_CS_FEMALE);
      apiD = API_AF_FEMALE;
      break;
    case '_AF_FEMALE':
      apiA = process.env.REACT_APP_API_KEY_AF_FEMALE;
      apiB = getRandomApiKey(API_EA_FEMALE, API_CS_FEMALE);
      apiC = getRandomApiKey(API_EA_MALE, API_CS_MALE);
      apiD = API_AF_MALE;
      break;
    case '_CS_MALE':
      apiA = process.env.REACT_APP_API_KEY_CS_MALE;
      apiB = getRandomApiKey(API_EA_MALE, API_AF_MALE);
      apiC = getRandomApiKey(API_EA_FEMALE, API_AF_FEMALE);
      apiD = API_CS_FEMALE;
      break;
    case '_CS_FEMALE':
      apiA = process.env.REACT_APP_API_KEY_CS_FEMALE;
      apiB = getRandomApiKey(API_EA_FEMALE, API_AF_FEMALE);
      apiC = getRandomApiKey(API_EA_MALE, API_AF_MALE);
      apiD = API_CS_MALE;
      break;
    default:
      break;
  }
  console.log('A', apiA, apiB, apiC, apiD);

  // dispatch(setApiKeysState(apiA, apiB, apiC, apiD));

  const [userChatType, setChatType] = useState(''); // 'A B C D'
  // for eslint
  console.log(userChatType, 'for trash');

  // const handleChatTypeChange = (type) => {
  //   setChatType(type);
  //   dispatch(setChatTypeState(type));
  // };
  const handleChatTypeChange = () => {
    if (chatType === 'A') {
      setChatType('A');
      dispatch(setChatTypeState('A'));
    } else if (chatType === 'B') {
      setChatType('B');
      dispatch(setChatTypeState('B'));
    } else if (chatType === 'C') {
      setChatType('C');
      dispatch(setChatTypeState('C'));
    } else if (chatType === 'D') {
      setChatType('D');
      dispatch(setChatTypeState('D'));
    }
  };

  const handleApiKeysUpdate = () => {
    dispatch(setApiKeysState(apiA, apiB, apiC, apiD));
  };

  return (
    <div className={className}>
      <div className="landing-wrapper">
        <div className="container d-flex">
          <div className="landing-container flex-grow-1">
            <div className="col-12 col-lg-10">
              <div className="row" style={{ marginBottom: '9px', marginTop: '120px' }}>
                <div>
                  <h1 className="fw-bol">Chat with Digital Influencers!</h1>
                </div>
              </div>
              <div className="row">
                <div>
                  <h5 className="fw-light" style={{ marginBottom: '32px' }}>
                    You will talk with 4 different digital influencers.
                    Feel free to chat about your interests, life or problems.
                  </h5>
                  <ul style={{ fontSize: '1.1rem' }}>
                    <li>
                      You have
                      {' '}
                      <strong>maximum three minutes</strong>
                      {' '}
                      for each digital influencer.
                    </li>
                    <li>
                      You can leave the conversation
                      {' '}
                      <strong>once 2 minutes have passed</strong>
                      , if you want.
                    </li>
                    <li>
                      The record will be only used for data analysis and it will be
                      discarded after the experiment.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '16px' }}>
                <div style={{ marginTop: '24px' }}>
                  <div className="form-check form-switch">
                    <label
                      className="form-check-label d-flex align-items-center"
                      htmlFor="micPermSwitch"
                    >
                      <input
                        className={`shadow form-check-input mic-switch switch ${
                          mic ? 'status-checked' : 'status-unchecked'
                        }`}
                        type="checkbox"
                        role="switch"
                        id="micPermSwitch"
                        onChange={() => dispatch(setRequestedMediaPerms({ mic: !mic }))}
                        checked={mic}
                      />
                      <div className="d-block ms-2" style={{ marginLeft: '12px' }}>
                        Use your microphone so digital influencers can hear you.
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '52px' }}>
                <div>
                  <div className="form-check form-switch">
                    <label
                      className="form-check-label d-flex align-items-center"
                      htmlFor="cameraPermSwitch"
                    >
                      <input
                        className={`shadow form-check-input video-switch switch ${
                          camera ? 'status-checked' : 'status-unchecked'
                        }`}
                        type="checkbox"
                        role="switch"
                        id="micPermSwitch"
                        onChange={() => dispatch(setRequestedMediaPerms({ camera: !camera }))}
                        checked={camera}
                      />
                      <div className="d-block ms-2">
                        Use your camera so you can chat face-to-face.
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '48px' }}>
                <div>
                  <div className="d-flex fs-4">
                    <CameraVideoFill size={26} />
                    <span className="ps-1">+</span>
                    <MicFill size={26} />
                    <div className="text-left fst-italic-bold" style={{ fontSize: '1.1rem', marginLeft: '12px' }}>
                      Please Enable your camera and mic to optimize a conversation.
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '24px' }}>
                <div className="col-lg-6 mb-2" style={{ marginBottom: '32px' }}>
                  <Link
                    to="/loading"
                    className="shadow btn primary-accent fs-3 w-100"
                    type="button"
                    onClick={() => handleChatTypeChange('A')}
                  >
                    Chat with A
                  </Link>
                </div>
                <div className="col-lg-6 mb-2" style={{ marginBottom: '24px' }}>
                  <Link
                    to="/loading"
                    className="shadow btn primary-accent fs-3 w-100"
                    type="button"
                    onClick={() => handleChatTypeChange('B')}
                  >
                    Chat with B
                  </Link>
                </div>
                <div className="col-lg-6 mb-2" style={{ marginBottom: '24px' }}>
                  <Link
                    to="/loading"
                    className="shadow btn primary-accent fs-3 w-100"
                    type="button"
                    onClick={() => handleChatTypeChange('C')}
                  >
                    Chat with C
                  </Link>
                </div>
                <div className="col-lg-6 mb-2">
                  <Link
                    to="/loading"
                    className="shadow btn primary-accent fs-3 w-100"
                    type="button"
                    onClick={() => handleChatTypeChange('D')}
                  >
                    Chat with D
                  </Link>
                </div>
              </div>
              <Link
                to={chatType === 'E' ? '/feedback' : '/loading'}
                className="shadow btn primary-accent fs-3 w-100"
                type="button"
                onClick={() => {
                  handleApiKeysUpdate();
                  handleChatTypeChange();
                }}
              >
                {chatType === 'E' ? 'Go to Survey' : 'Start here test'}
              </Link>
              <div className="col" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LandingAfter.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(LandingAfter)`
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

    &>div {
      background-color: ${Color(landingBackgroundColor).alpha(0.5)};
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0,0,0,0.1);
      padding: 1rem;
      border-radius: 5px;

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

`;
