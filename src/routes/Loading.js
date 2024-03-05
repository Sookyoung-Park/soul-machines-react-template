import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import { useHistory, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowLeftCircleFill, ArrowRightCircleFill, BodyText, ChatLeftQuoteFill, MicFill,
} from 'react-bootstrap-icons';
import { createScene } from '../store/sm';
import { headerHeight, landingBackgroundColor, landingBackgroundImage } from '../config';

function Loading({ className }) {
  // 리덕스 조회해서 상태 가져옴
  const {
    connected,
    loading,
    error,
    requestedMediaPerms,
    connectionState,
    user,
  } = useSelector(({ sm }) => (sm));

  // const { gender, race } = user.info;
  const { chatType } = user.chatType;
  const {
    apiA, apiB, apiC, apiD,
  } = user.apiKey;

  // console.log('apiC', apiC);
  // console.log(chatType, ': saved ChatType in Loading.js');

  // 상태 변경을 일으키기 위해서는 액션이라는 객체를 디스패치해야 합니다. useDispatch 훅은 이런 액션을 디스패치하기 위한 메소드를 반환합니다.
  const dispatch = useDispatch();

  const [isLoadingMade, setIsLoadingMade] = useState(false);

  const {
    percentageLoaded, name, currentStep, totalSteps,
  } = connectionState;

  const stateNameMap = {
    SearchingForDigitalPerson: 'Searching For Digital Influencers',
    DownloadingAssets: 'Downloading Assets',
    ConnectingToDigitalPerson: 'Connecting To Digital Influencers',
  };
  // map name vals to plain english if we know the state name, otherwise just display the name as is
  const stateName = (name in stateNameMap) ? stateNameMap[name] : name;

  // // pull querystring to see if we are displaying an error
  // // (app can redirect to /loading on fatal err)
  // const useQuery = () => new URLSearchParams(useLocation().search);
  // const query = useQuery();

  // // api key condition
  // const API_EA_MALE = process.env.REACT_APP_API_KEY_EA_MALE;
  // const API_EA_FEMALE = process.env.REACT_APP_API_KEY_EA_FEMALE;
  // const API_AF_MALE = process.env.REACT_APP_API_KEY_AF_MALE;
  // const API_AF_FEMALE = process.env.REACT_APP_API_KEY_AF_FEMALE;
  // const API_CS_MALE = process.env.REACT_APP_API_KEY_CS_MALE;
  // const API_CS_FEMALE = process.env.REACT_APP_API_KEY_CS_FEMALE;

  // // extract user info
  // const infoString = `_${race}_${gender}`;
  // console.log('info string : ', infoString);

  // let apiA;
  // let apiB;
  // let apiC;
  // let apiD;

  // function getRandomApiKey(api1, api2) {
  //   const randomIndex = Math.random() < 0.5 ? 0 : 1;
  //   return randomIndex === 0 ? api1 : api2;
  // }

  // // api allocation logic
  // // ApiKey_A = same race, same gender
  // // ApiKey_B = different race, same gender
  // // ApiKey_C = different race, different gender
  // // ApiKey_D = same race, different gender
  // switch (infoString) {
  //   case '_EA_MALE':
  //     apiA = API_EA_MALE;
  //     apiB = getRandomApiKey(API_AF_MALE, API_CS_MALE);
  //     apiC = getRandomApiKey(API_AF_FEMALE, API_CS_FEMALE);
  //     apiD = API_EA_FEMALE;
  //     break;
  //   case '_EA_FEMALE':
  //     apiA = process.env.REACT_APP_API_KEY_EA_FEMALE;
  //     apiB = getRandomApiKey(API_AF_FEMALE, API_CS_FEMALE);
  //     apiC = getRandomApiKey(API_AF_MALE, API_CS_MALE);
  //     apiD = API_EA_MALE;
  //     break;
  //   case '_AF_MALE':
  //     apiA = process.env.REACT_APP_API_KEY_AF_MALE;
  //     apiB = getRandomApiKey(API_EA_MALE, API_CS_MALE);
  //     apiC = getRandomApiKey(API_EA_FEMALE, API_CS_FEMALE);
  //     apiD = API_AF_FEMALE;
  //     break;
  //   case '_AF_FEMALE':
  //     apiA = process.env.REACT_APP_API_KEY_AF_FEMALE;
  //     apiB = getRandomApiKey(API_EA_FEMALE, API_CS_FEMALE);
  //     apiC = getRandomApiKey(API_EA_MALE, API_CS_MALE);
  //     apiD = API_AF_MALE;
  //     break;
  //   case '_CS_MALE':
  //     apiA = process.env.REACT_APP_API_KEY_CS_MALE;
  //     apiB = getRandomApiKey(API_EA_MALE, API_AF_MALE);
  //     apiC = getRandomApiKey(API_EA_FEMALE, API_AF_FEMALE);
  //     apiD = API_CS_FEMALE;
  //     break;
  //   case '_CS_FEMALE':
  //     apiA = process.env.REACT_APP_API_KEY_CS_FEMALE;
  //     apiB = getRandomApiKey(API_EA_FEMALE, API_AF_FEMALE);
  //     apiC = getRandomApiKey(API_EA_MALE, API_AF_MALE);
  //     apiD = API_CS_MALE;
  //     break;
  //   default:
  //     break;
  // }

  // console.log(apiA, apiB, apiC, apiD);

  // create persona scene on button press on on mount, depending on device size
  // connected with api
  // const apiKey = process.env.REACT_APP_API_KEY_EA_MALE || '';
  const createSceneIfNotStarted = (apiKey) => {
    if (loading === false && connected === false && error === null) {
      dispatch(createScene(apiKey));
      setIsLoadingMade(true);
    }
  };

  if (chatType === 'A') {
    createSceneIfNotStarted(apiA);
    // setIsLoadingMade(true);
  } else if (chatType === 'B') {
    createSceneIfNotStarted(apiB);
    // setIsLoadingMade(true);
  } else if (chatType === 'C') {
    createSceneIfNotStarted(apiC);
    // setIsLoadingMade(true);
  } else if (chatType === 'D') {
    createSceneIfNotStarted(apiD);
    // setIsLoadingMade(true);
  }

  useEffect(() => {
    createSceneIfNotStarted();
  }, []);

  const iconSize = 66;
  const [page, setPage] = useState(0);
  const pages = [
    <div>
      <div className="row justify-content-center">
        <div className="tutorial-icon mb-2">
          <MicFill size={iconSize} />
        </div>
      </div>
      <div className="row">
        <div className="d-flex align-items-center justify-content-between">
          <button className="btn-unstyled" type="button" style={{ opacity: 0, width: '44px' }}>
            {' '}
          </button>
          <h4>
            Before You Begin
          </h4>
          <button className="btn-unstyled" type="button" onClick={() => setPage(page + 1)}>
            <ArrowRightCircleFill size={32} />
          </button>
        </div>
        <div className="mt-0 mb-2">
          {
            // show different modal if mic is off or if mic perms are denied
            requestedMediaPerms.mic === true && requestedMediaPerms.micDenied === false
              ? (
                <div>
                  <p>
                    Conversation works best in a quiet environment
                    with your microphone and camera on!
                  </p>
                </div>
              )
              : (
                <div>
                  <p>
                    Conversation works best in a quiet environment
                    with your microphone and camera on!
                  </p>
                </div>
              )
          }
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
          Noah will listen to whatever you say.
          Speak clearly, and in short responses.
          {/* Other options, like typing or choosing your responses, are also available. */}
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
            Have Fun with Digital People!
          </h4>
          <button className="btn-unstyled" type="button" style={{ opacity: 0, width: '44px' }}>
            {' '}
          </button>
        </div>
        <div className="mt-0 mb-2">
          Feel free to talk to Noah about your life, problems or any questions!
        </div>
      </div>
    </div>,
  ];

  const [skip, setSkip] = useState(false);
  const redirectToVideoOnConnect = () => {
    setSkip(true);
    // setIsLoadingMade(true);
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
                {/* {isLoadingMade && (
                <Link
                  to="/presurvey2"
                  className="btn btn-dark connected-button"
                  type="button"
                  disabled={skip}
                  onClick={redirectToVideoOnConnect}
                >
                  Next
                </Link>
                )} */}
                {isLoadingMade && (
                <button
                  className={`${connected ? 'btn btn-dark connected-button' : 'btn-unstyled unconnected-button'} m-2`}
                  type="button"
                  disabled={skip}
                  onClick={redirectToVideoOnConnect}
                >
                  { connected ? `Chat with Influencer ${chatType}` : 'Please wait for the loading ...' }
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
