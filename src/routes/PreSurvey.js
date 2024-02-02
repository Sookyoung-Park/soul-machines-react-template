import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Color from 'color';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import breakpoints from '../utils/breakpoints';
import Header from '../components/Header';
import { landingBackgroundImage, landingBackgroundColor } from '../config';
import micFill from '../img/mic-fill.svg';
import videoFill from '../img/camera-video-fill.svg';
import { setUserInfoState } from '../store/sm';

function PreSurvey({ className }) {
  // redux store values
  const { user } = useSelector(({ sm }) => ({ ...sm }));
  const { gender, race } = user.info;

  const [userGender, setUserGender] = useState(''); // 'Female' for Female, 'Male' for Male
  const [userRace, setUserRace] = useState(''); // 'Caucasian', 'African', 'Asian'

  const dispatch = useDispatch();

  const handleGenderChange = (selectedGender) => {
    setUserGender(selectedGender);
  };

  const handleRaceChange = (selectedRace) => {
    setUserRace(selectedRace);
  };

  const handleSubmit = () => {
    dispatch(setUserInfoState(userGender, userRace));
  };

  // console.log('Gender:', userGender);
  // console.log('Race:', userRace);
  console.log('ReduxGender', gender);
  console.log('ReduxRace ', race);

  return (
    <div className={className}>
      <div className="landing-wrapper">
        <Header />
        <div className="container d-flex">
          <div className="landing-container flex-grow-1">
            <div className="col-12 col-lg-6">
              <div className="row" style={{ marginBottom: '9px', marginTop: '200px' }}>
                <div>
                  <h1 className="fw-bol">Pre-Survey</h1>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '36px' }}>
                <div>
                  <h5 style={{ marginBottom: '48px' }}>---experiment description ---</h5>
                  <h4>Select your Gender</h4>
                  <Form>
                    <div key="default-radio" className="mb-3">
                      <Form.Check
                        type="radio"
                        id="genderMale"
                        label="Male"
                        name="gender-selection"
                        style={{ fontSize: '1.5rem' }}
                        onChange={() => handleGenderChange('Male')}
                      />
                      <Form.Check
                        type="radio"
                        id="genderFemale"
                        label="Female"
                        name="gender-selection"
                        style={{ fontSize: '1.5rem' }}
                        onChange={() => handleGenderChange('Female')}
                      />
                    </div>
                  </Form>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '36px' }}>
                <div>
                  <h4>Select your Race</h4>
                  <Form>
                    <div key="default-radio" className="mb-3">
                      <Form.Check
                        type="radio"
                        id="raceAsian"
                        label="Asian"
                        name="race-selection"
                        style={{ fontSize: '1.5rem' }}
                        onChange={() => handleRaceChange('Asian')}
                      />
                      <Form.Check
                        type="radio"
                        id="raceAfrican"
                        label="African"
                        name="race-selection"
                        style={{ fontSize: '1.5rem' }}
                        onChange={() => handleRaceChange('African')}
                      />
                      <Form.Check
                        type="radio"
                        id="raceCaucasian"
                        label="Caucasian"
                        name="race-selection"
                        style={{ fontSize: '1.5rem' }}
                        onChange={() => handleRaceChange('Caucasian')}
                      />
                    </div>
                  </Form>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '60px' }}>
                <div>
                  <Link
                    to="/landingafter"
                    className="shadow btn primary-accent fs-3"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Link>
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

PreSurvey.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(PreSurvey)`
  .landing-wrapper {
    min-height: 100vh;

    background: ${landingBackgroundImage ? `url(${landingBackgroundImage})` : ''} ${landingBackgroundColor ? `${landingBackgroundColor};` : ''};
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

`;
