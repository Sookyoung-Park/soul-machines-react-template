import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Color from 'color';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import breakpoints from '../utils/breakpoints';
import { landingBackgroundColor } from '../config';
import micFill from '../img/mic-fill.svg';
import videoFill from '../img/camera-video-fill.svg';
import { setUserInfoState } from '../store/sm';

import eaMale from '../img/EA_Male.png';
import eaFemale from '../img/EA_Female.png';
import afMale from '../img/AF_Male.png';
import afFemale from '../img/AF_Female.png';
import csMale from '../img/CS_Male.png';
import csFemale from '../img/CS_Female.png';

function PreSurvey2({ className }) {
  // redux store values
  const { user } = useSelector(({ sm }) => ({ ...sm }));
  const { gender, race } = user.info;
  // for eslint
  console.log('for eslint', race);

  const [userRace, setUserRace] = useState(''); // 'Caucasian :CS', 'African: AF', 'Asian: EA'
  const [isSelectionMade, setIsSelectionMade] = useState(false);

  const dispatch = useDispatch();

  const handleRaceChange = (selectedRace) => {
    setUserRace(selectedRace);
    setIsSelectionMade(true);
  };

  const handleSubmit = () => {
    dispatch(setUserInfoState(gender, userRace));
  };

  return (
    <div className={className}>
      <div className="landing-wrapper">
        <div className="container d-flex">
          <div className="landing-container flex-grow-1">
            <div className="col-12 col-lg-10 survey-container">
              <div className="row" style={{ marginBottom: '9px', marginTop: '200px' }}>
                <div>
                  <h1 className="fw-bol">Pre-Survey</h1>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '36px' }}>
                <div>
                  <h4 style={{ marginBottom: '24px' }}>
                    Please choose the digital influencer
                    whose physical appearance is most similar to yours.

                  </h4>
                  <Form>
                    <div key="default-radio" className="d-flex" style={{ marginRight: '20px' }}>
                      <Form.Check
                        type="radio"
                        id="raceAsian"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleRaceChange('EA')}
                        label={(
                          <div>
                            {gender === 'MALE' && (
                            <img src={eaMale} alt="Asian" style={{ width: '260px', height: '220px' }} />
                            )}
                            {gender === 'FEMALE' && (
                            <img src={eaFemale} alt="Asian" style={{ width: '260px', height: '220px' }} />
                            )}
                            {gender !== 'MALE' && gender !== 'FEMALE' && (
                            <img src={afFemale} alt="none" style={{ width: '260px', height: '220px' }} />
                            )}
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceAfrican"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleRaceChange('AF')}
                        label={(
                          <div>
                            {gender === 'MALE' && (
                            <img src={afMale} alt="African" style={{ width: '260px', height: '220px' }} />
                            )}
                            {gender === 'FEMALE' && (
                            <img src={afFemale} alt="African" style={{ width: '260px', height: '220px' }} />
                            )}
                            {gender !== 'MALE' && gender !== 'FEMALE' && (
                            <img src={eaFemale} alt="none" style={{ width: '260px', height: '220px' }} />
                            )}
                          </div>
                        )}
                      />
                      <Form.Check
                        type="radio"
                        id="raceCaucasian"
                        name="race-selection"
                        style={{ marginRight: '24px' }}
                        onChange={() => handleRaceChange('CS')}
                        label={(
                          <div>
                            {gender === 'MALE' && (
                            <img src={csMale} alt="Caucasian" style={{ width: '260px', height: '220px' }} />
                            )}
                            {gender === 'FEMALE' && (
                            <img src={csFemale} alt="Caucasian" style={{ width: '260px', height: '220px' }} />
                            )}
                            {gender !== 'MALE' && gender !== 'FEMALE' && (
                            <img src={csMale} alt="none" style={{ width: '260px', height: '220px' }} />
                            )}
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
                    to="/landingafter"
                    className="shadow btn primary-accent fs-3"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Start
                  </Link>
                  )}
                </div>
              </div>
              <div className="col" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PreSurvey2.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(PreSurvey2)`
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

`;
