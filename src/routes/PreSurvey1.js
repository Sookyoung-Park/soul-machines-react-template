import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Color from 'color';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import breakpoints from '../utils/breakpoints';
import { landingBackgroundColor } from '../config';
import micFill from '../img/mic-fill.svg';
import videoFill from '../img/camera-video-fill.svg';
import { setUserInfoState } from '../store/sm';

import EA_MALE from '../img/EA_MALE.png';
import EA_FEMALE from '../img/EA_FEMALE.png';
import AF_MALE from '../img/AF_MALE.png';
import AF_FEMALE from '../img/AF_FEMALE.png';
import CS_MALE from '../img/CS_MALE.png';
import CS_MALE_2 from '../img/CS_MALE_2.png';
import CS_FEMALE from '../img/CS_FEMALE.png';
import CS_FEMALE_2 from '../img/CS_FEMALE_2.png';
import HP_MALE from '../img/HP_MALE.png';
import HP_MALE_2 from '../img/HP_MALE_2.png';
import HP_FEMALE from '../img/HP_FEMALE.png';
import HP_FEMALE_2 from '../img/HP_FEMALE_2.png';
import AI_MALE from '../img/AI_MALE.png';
import AI_FEMALE from '../img/AI_FEMALE.png';
import SA_MALE from '../img/SA_MALE.png';
import SA_FEMALE from '../img/SA_FEMALE.png';

function PreSurvey1({ className }) {
  const [userGender, setUserGender] = useState('');
  const [userRace, setUserRace] = useState(''); // 'Caucasian :CS', 'African: AF', 'Asian: EA'
  const [isSelectionMade, setIsSelectionMade] = useState(false);

  const dispatch = useDispatch();

  const handleGenderRaceChange = (selectedGender, selectedRace) => {
    setUserGender(selectedGender);
    setUserRace(selectedRace);
    setIsSelectionMade(true);
  };

  const handleSubmit = () => {
    dispatch(setUserInfoState(userGender, userRace));
  };

  return (
    <div className={className}>
      <div className="landing-wrapper">
        <div className="container d-flex">
          <div className="landing-container flex-grow-1">
            <div className="col-12 col-lg-10 survey-container">
              <div className="row" style={{ marginBottom: '10px', marginTop: '24px' }}>
                <div />
              </div>
              <div className="row" style={{ marginBottom: '36px' }}>
                <div>
                  <h3 style={{ marginBottom: '32px' }}>
                    Please choose an AI avatar
                    whose physical appearance is most similar to yours.
                  </h3>
                  <Form>
                    <div key="default-radio" className="d-flex" style={{ marginRight: '20px' }}>
                      <Form.Check
                        type="radio"
                        id="raceAsian"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('FEMALE', 'EA')}
                        label={(
                          <div>
                            <img src={EA_FEMALE} alt="Asian" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceAsian"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('MALE', 'EA')}
                        label={(
                          <div>
                            <img src={EA_MALE} alt="Asian" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceIndian"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('MALE', 'AI')}
                        label={(
                          <img src={AI_MALE} alt="Indian" style={{ width: '240px', height: '200px' }} />
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceCaucasian"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('FEMALE', 'AI')}
                        label={(
                          <div>
                            <img
                              src={AI_FEMALE}
                              alt="Indian"
                              style={{ width: '240px', height: '200px' }}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div key="default-radio" className="d-flex" style={{ marginRight: '20px' }}>
                      <Form.Check
                        type="radio"
                        id="raceCaucasian"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('MALE', 'CS')}
                        label={(
                          <div>
                            <img src={CS_MALE} alt="Caucasian" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceCaucasian"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('FEMALE', 'CS')}
                        label={(
                          <div>
                            <img src={CS_FEMALE} alt="Caucasian" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceHispanic"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('FEMALE', 'HP')}
                        label={(
                          <div>
                            <img src={HP_FEMALE} alt="Hispanic" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceHispanic"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('MALE', 'HP')}
                        label={(
                          <div>
                            <img src={HP_MALE} alt="Hispanic" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                    </div>
                    <div key="default-radio" className="d-flex" style={{ marginRight: '20px' }}>
                      <Form.Check
                        type="radio"
                        id="raceAfrican"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('MALE', 'AF')}
                        label={(
                          <div>
                            <img src={AF_MALE} alt="African" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceAfrican"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('FEMALE', 'AF')}
                        label={(
                          <div>
                            <img src={AF_FEMALE} alt="African" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceSouthAsian"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('MALE', 'SA')}
                        label={(
                          <div>
                            <img src={SA_MALE} alt="SouthAsian" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceAfrican"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('FEMALE', 'SA')}
                        label={(
                          <div>
                            <img src={SA_FEMALE} alt="SouthAsian" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                    </div>
                    <div key="default-radio" className="d-flex" style={{ marginRight: '20px' }}>
                      <Form.Check
                        type="radio"
                        id="raceCaucasian"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('FEMALE_2', 'CS')}
                        label={(
                          <div>
                            <img src={CS_FEMALE_2} alt="Caucasian" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceCaucasian"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('MALE_2', 'CS')}
                        label={(
                          <div>
                            <img src={CS_MALE_2} alt="Caucasian" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceHispanic"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('FEMALE_2', 'HP')}
                        label={(
                          <div>
                            <img src={HP_FEMALE_2} alt="Hispanic" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceHispanic"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleGenderRaceChange('MALE_2', 'HP')}
                        label={(
                          <div>
                            <img src={HP_MALE_2} alt="Hispanic" style={{ width: '240px', height: '200px' }} />
                          </div>
                        )}
                      />
                    </div>
                  </Form>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '60px' }}>
                <div>
                  {isSelectionMade && (
                  <Link
                    to="/presurvey-prompt"
                    className="shadow btn primary-accent fs-3 StartButton"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Next
                  </Link>
                  )}
                </div>
                {/* <div>
                  {isSelectionMade && (
                  <Link
                    to="/landingafter"
                    className="shadow btn primary-accent fs-3 StartButton"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Start
                  </Link>
                  )}
                </div> */}
              </div>
              <div className="col" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PreSurvey1.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(PreSurvey1)`
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
    align-tiems: center;
  }

  .fw-bol{
    margin-bottom: 32px;
  }

  .survey-container{
    align-items: cneter;
  }

  .NextButton:hover {
    background-color: #00693e;
  }

`;
