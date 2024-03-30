import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowLeftCircleFill, ArrowRightCircleFill, BodyText,
  ChatLeftQuoteFill,
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
  } else if (chatType === 'B') {
    createSceneIfNotStarted(apiB);
    chatPrompt = chatPrompts.B;
  } else if (chatType === 'C') {
    createSceneIfNotStarted(apiC);
    chatPrompt = chatPrompts.C;
  } else if (chatType === 'D') {
    createSceneIfNotStarted(apiD);
    chatPrompt = chatPrompts.D;
  }

  function getTextBasedOnCondition(chatprompt) {
    switch (chatprompt) {
      case 'Art':
        return (
          <div>
            <strong>You can use these discussion topic if you want!</strong>
            <br />
            - Do you like paintings or sketching?
            <br />
            - Have you ever been to any famous art museums?
            <br />
            - Are movies a form of art?
            <br />
            - Why do you enjoy art?
          </div>
        );

      case 'Free Time & Hobbies':
        return (
          <div>
            <strong>You can use these discussion topic if you want!</strong>
            <br />
            - What are you doing this weekend?
            <br />
            - Who do you spend your free time with?
            <br />
            - What are your hobbies?
            <br />
            - Are there any hobbies you would like to try?
          </div>
        );

      case 'Hometown':
        return (
          <div>
            <strong>You can use these discussion topic if you want!</strong>
            <br />
            - Do you like your hometown? Why or why not?
            <br />
            - Does anyone famous come from your hometown?
            <br />
            - What is the best season in your hometown?
            <br />
            - If you could change one thing in your hometown, what would you change and why?
          </div>
        );

      case 'Vacations':
        return (
          <div>
            <strong>You can use these discussion topic if you want!</strong>
            <br />
            - Did you enjoy your last vacation? / How was your last vacation?
            <br />
            - How much money did you spend on your last vacation?
            <br />
            - Where in the world would you most like to go for your next vacation?
            <br />
            - What is the most exotic or strangest thing you ate on holiday?
          </div>
        );

      case 'Music':
        return (
          <div>
            <strong>You can use these discussion topic if you want!</strong>
            <br />
            - What kind of music do you like?
            <br />
            - Are you a good singer?
            <br />
            - Is there any kind of music that you hate?
            <br />
            - Who is your favorite composer?
          </div>
        );

      case 'First Dates':
        return (
          <div>
            <strong>You can use these discussion topic if you want!</strong>
            <br />
            - Can you tell us about your first date?
            <br />
            - What are some places you could go on a first date?
            <br />
            - Is the first impression important?
            <br />
            - What things would you talk about on your first date?
          </div>
        );

      case 'Work':
        return (
          <div>
            <strong>You can use these discussion topic if you want!</strong>
            <br />
            - At what age do people usually begin to work in your country?
            <br />
            - Can you describe your current job?
            <br />
            - Do you like your job?
            <br />
            - How do you like your work?
          </div>
        );

      case 'Cooking & Food':
        return (
          <div>
            <strong>You can use these discussion topic if you want!</strong>
            <br />
            - Are you a good cook?
            <br />
            - Do you eat breakfast every day?
            <br />
            - What kind of food do like to eat when you are angry?
            <br />
            - What kind of fruit do you like the best?
          </div>
        );

      case 'Motivation':
        return (
          <div>
            <strong>You can use these discussion topic if you want!</strong>
            <br />
            - How do you define motivation?
            <br />
            - What are three things that motivate you?
            <br />
            - Is your goal specific, measurable, with a deadline?
            <br />
            - Is your goal specific, measurable, with a deadline?
          </div>
        );

      case 'Fashion & Beauty':
        return 'a';
      case 'Science & Technology':
        return 'a';
      case 'Family and Friends':
        return 'a';
      case 'Dating & Marriage':
        return 'a';
      case 'Goals':
        return 'a';
      case 'Childhood':
        return 'a';
      case 'Restaurants':
        return 'a';
      case 'Money':
        return 'a';
      case 'Shopping':
        return 'a';
      case 'Animals & Pets':
        return 'a';
      case 'Books':
        return 'a';
      case 'Sports':
        return 'a';
      case 'Life':
        return 'a';
      case 'Movies':
        return 'a';

      default:
        return "Default text when condition doesn't match any case";
    }
  }

  useEffect(() => {
    createSceneIfNotStarted();
  }, []);

  const iconSize = 66;
  const [page, setPage] = useState(0);
  const pages = [
    <div>
      <div className="row">
        <div className="d-flex align-items-center justify-content-between">
          <button className="btn-unstyled" type="button" style={{ opacity: 0, width: '44px' }}>
            {' '}
          </button>
          <h2 style={{ color: '#00693e', marginBottom: '32px' }}>
            Prompt:
            {' '}
            {chatPrompt}
          </h2>
          <button className="btn-unstyled" type="button" onClick={() => setPage(page + 1)}>
            <ArrowRightCircleFill size={32} />
          </button>
        </div>
        <div className="mt-0 mb-2">
          {getTextBasedOnCondition(chatPrompt)}
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
                        className="progress-bar bg-success"
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
