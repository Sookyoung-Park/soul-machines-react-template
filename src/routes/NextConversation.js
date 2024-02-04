import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Color from 'color';
import { Link } from 'react-router-dom';
import breakpoints from '../utils/breakpoints';
// import Header from '../components/Header';
import { landingBackgroundColor } from '../config';
import micFill from '../img/mic-fill.svg';
import videoFill from '../img/camera-video-fill.svg';

function NextConversation({ className }) {
  return (
    <div className={className}>
      <div className="landing-wrapper">
        {/* <Header /> */}
        <div className="container d-flex">
          <div className="landing-container flex-grow-1">
            <div className="col-12 col-lg-8">
              <div className="row" style={{ marginBottom: '60px' }}>
                <div>
                  <Link
                    to="/landingafter"
                    className="shadow btn primary-accent fs-3"
                    type="button"
                  >
                    Chat with Next Influencer
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
    align-tiems: center;
  }

  .description{
    font-size: 1.2rem;
    line-height: 150%;
    margin-top: 24px;
  }

  .noted{
    font-size: 1.1rem;
    margin-top: 20px;
    font-weight: 600;
  }

`;