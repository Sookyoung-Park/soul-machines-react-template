import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowLeftCircleFill, ArrowRightCircleFill, BodyText,
  ChatLeftQuoteFill,
  // MicFill,
} from 'react-bootstrap-icons';
import { createScene } from '../store/sm';
import { headerHeight, landingBackgroundColor, landingBackgroundImage } from '../config';

function Loading({ className }) {
  const {
    connected,
    loading,
    error,
    requestedMediaPerms,
    connectionState,
    user,
  } = useSelector(({ sm }) => (sm));

  const { chatType } = user.chatType;
  const {
    apiA, apiB, apiC, apiD,
  } = user.apiKey;
  const { chatPrompts } = user;

  const dispatch = useDispatch();

  const [isLoadingMade, setIsLoadingMade] = useState(false);

  const {
    percentageLoaded, name, currentStep, totalSteps,
  } = connectionState;

  const stateNameMap = {
    SearchingForDigitalPerson: 'Searching For AI Avatar',
    DownloadingAssets: 'Downloading Assets',
    ConnectingToDigitalPerson: 'Connecting To AI Avatar',
  };
  // map name vals to plain english if we know the state name, otherwise just display the name as is
  const stateName = (name in stateNameMap) ? stateNameMap[name] : name;

  // create persona scene on button press on on mount, depending on device size
  const createSceneIfNotStarted = (apiKey) => {
    if (loading === false && connected === false && error === null) {
      dispatch(createScene(apiKey));
      setIsLoadingMade(true);
    }
  };

  let chatPrompt;
  if (chatType === 'A') {
    createSceneIfNotStarted(apiA);
    chatPrompt = chatPrompts.A;
    // setIsLoadingMade(true);
  } else if (chatType === 'B') {
    createSceneIfNotStarted(apiB);
    chatPrompt = chatPrompts.B;
    // setIsLoadingMade(true);
  } else if (chatType === 'C') {
    createSceneIfNotStarted(apiC);
    chatPrompt = chatPrompts.C;
    // setIsLoadingMade(true);
  } else if (chatType === 'D') {
    createSceneIfNotStarted(apiD);
    chatPrompt = chatPrompts.D;
    // setIsLoadingMade(true);
  }

  useEffect(() => {
    createSceneIfNotStarted();
  }, []);

  const iconSize = 66;
  const [page, setPage] = useState(0);
  const pages = [
    <div>
      {/* <div className="row justify-content-center"> */}
      {/* <div className="tutorial-icon mb-2">
          <MicFill size={iconSize} />
        </div> */}
      {/* </div> */}
      <div className="row">
        <div className="d-flex align-items-center justify-content-between">
          <button className="btn-unstyled" type="button" style={{ opacity: 0, width: '44px' }}>
            {' '}
          </button>
          <h2 style={{ color: '#00693e' }}>
            Prompt:
            {' '}
            {chatPrompt}
          </h2>
          <button className="btn-unstyled" type="button" onClick={() => setPage(page + 1)}>
            <ArrowRightCircleFill size={32} />
          </button>
        </div>
      </div>
    </div>,
    <div>
      <div className="row justify-content-center">
        <div className="tutorial-icon mb-2">
          <BodyText size={iconSize} />
        </div>
      </div>
      <div className="row">
        <div className="d-flex align-items-center justify-content-between">
          <button className="btn-unstyled" type="button" onClick={() => setPage(page - 1)}>
            <ArrowLeftCircleFill size={32} />
          </button>
          <h4>
            What you do.
          </h4>
          <button className="btn-unstyled" type="button" onClick={() => setPage(page + 1)}>
            <ArrowRightCircleFill size={32} />
          </button>
        </div>
        <div className="mt-0 mb-2">
          Speak clearly, and in short responses.
        </div>
      </div>
    </div>,
    <div>
      <div className="row justify-content-center">
        <div className="tutorial-icon mb-2">
          <ChatLeftQuoteFill size={iconSize} />
        </div>
      </div>
      <div className="row">
        <div className="d-flex align-items-center justify-content-between">
          <button className="btn-unstyled" type="button" onClick={() => setPage(page - 1)}>
            <ArrowLeftCircleFill size={32} />
          </button>
          <h4>
            {/* Have Fun! */}
            Before you begin,
          </h4>
          <button className="btn-unstyled" type="button" style={{ opacity: 0, width: '44px' }}>
            {' '}
          </button>
        </div>
        <div className="mt-0 mb-2">
          <div>
            <div className="mt-0 mb-2">
              {
            // show different modal if mic is off or if mic perms are denied
            requestedMediaPerms.mic === true && requestedMediaPerms.micDenied === false
              ? (
                <div>
                  <p>
                    Conversation works best in a quiet environment
                    <br />
                    with your microphone and camera on!
                  </p>
                </div>
              )
              : (
                <div>
                  <p>
                    Conversation works best in a quiet environment
                    <br />
                    with your microphone and camera on!
                  </p>
                </div>
              )
          }
            </div>
          </div>
          {/* Feel free to talk about a prompt you select with AI avatars. */}
        </div>
      </div>
    </div>,
  ];

  const [skip, setSkip] = useState(false);
  const redirectToVideoOnConnect = () => {
    setSkip(true);
  };

  const history = useHistory();
  useEffect(() => {
    if (skip === true && connected === true) history.push('/video');
  }, [connected, skip]);

  return (
    <div className={className}>
      {/* <Header /> */}
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-11 col-md-6 text-center mobile">
            <div className="row">
              {pages[page]}
            </div>
            <div className="row">
              <div>
                {isLoadingMade && (
                <button
                  className={`${connected ? 'btn btn-dark connected-button' : 'btn-unstyled unconnected-button'} m-2`}
                  type="button"
                  disabled={skip}
                  onClick={redirectToVideoOnConnect}
                >
                  { connected ? `Chat with Avatar ${chatType}` : 'It may take time. Please wait for the loading ...' }
                </button>
                )}
              </div>
            </div>
            <div className="row justify-content-center">
              <div>
                {/* eslint-disable-next-line react/no-array-index-key */}
                {pages.map((_, i) => (<div key={`${i}-${i === page}`} className="d-inline-block p-1">{i === page ? <div className="closed-dot" /> : <div className="open-dot" />}</div>))}
              </div>
            </div>
            {
              percentageLoaded < 100
                ? (
                  <div>
                    <div className="progress mt-1">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${percentageLoaded}%` }}
                        aria-label={`${stateName} (${currentStep} out of ${totalSteps - 1})`}
                        aria-valuenow={percentageLoaded}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    { stateName !== ''
                      ? (
                        <pre>
                          {`${stateName} (${currentStep} out of ${totalSteps - 1} steps)`}
                        </pre>
                      )
                      : null}
                  </div>
                )
                : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

Loading.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Loading)`
  background: ${landingBackgroundColor};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;

  width: 100vw;
  height: 100vh;
  color: #3C3C3C;

  &>.container>.row {
    height: calc(100vh - ${headerHeight});
  }
  .mobile {
    @media (max-width: 400px) {
      width: 300px;
    }
  .connected-button {
    background-color: #3C3C3C;
    border: 2px solid #3C3C3C;
  }

  .unconnected-button {
    font-size: 14px;
    font-family: "Helvetica Neue";
  }

  .tutorial-icon {
    width: 180px;
    height: 180px;
    aspect-ratio: 1;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #EAEAEA;
  }
  .tutorial-icon-dp {
    background-image: url(${landingBackgroundImage});
    background-size: cover;
    background-position: bottom center;
  }
  .open-dot {
    border: 2px solid #3C3C3C;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .closed-dot {
    border: 2px solid #3C3C3C;
    background: #3C3C3C;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
`;
