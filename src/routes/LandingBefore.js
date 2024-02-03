import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Color from 'color';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import breakpoints from '../utils/breakpoints';
import Header from '../components/Header';
import { landingBackgroundImage, landingBackgroundColor } from '../config';
import micFill from '../img/mic-fill.svg';
import videoFill from '../img/camera-video-fill.svg';

function LandingBefore({ className }) {
  const { user } = useSelector(({ sm }) => ({ ...sm }));
  const { gender, race } = user.info;
  console.log(gender, race);

  return (
    <div className={className}>
      <div className="landing-wrapper">
        <Header />
        <div className="container d-flex">
          <div className="landing-container flex-grow-1">
            <div className="col-12 col-lg-6">
              <div className="row" style={{ marginBottom: '9px', marginTop: '200px' }}>
                <div>
                  <h1 className="fw-bol">Chat with Digital Influencers!</h1>
                </div>
              </div>
              <div className="row">
                <div>
                  <h4 className="fw-light" style={{ marginBottom: '31px' }}>
                    Talk with digital influencers about your life or problems.
                    They will be your amazing buddy!
                  </h4>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '60px', marginTop: '40px' }}>
                <div>
                  <Link
                    to="/presurvey1"
                    className="shadow btn primary-accent fs-3"
                    type="button"
                  >
                    Before Experiment
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

LandingBefore.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(LandingBefore)`
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
