import React, { useState } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import eaMale from '../img/EA_Male.png';
// import eaFemale from '../img/EA_Female.png';
// import afMale from '../img/AF_Male.png';
// import afFemale from '../img/AF_Female.png';
// import csMale from '../img/CS_Male.png';
// import csFemale from '../img/CS_Female.png';

const json = {
  elements: [
    {
      type: 'ranking',
      name: 'rank-trustworthy',
      title: 'Please rank the trustworthy conversation from the most important to the least',
      isRequired: true,
      choices: [
        'DP A',
        'DP B',
        'DP C',
        'DP D',
      ],
    },
  ],
  showQuestionNumbers: false,
};

function PostSurvey1({ className }) {
  // firestore experimentType A,B,C,D 가져와서 이미지 불러오기
  // string 바꾸기 (이미지 타입으로)
  // 조건부로 뿌리기 필요없는 이미지는 opacity100으로 만들어보기 ( 어떻게 안쓰는 파일 에러 안뜨게하는지 생각해보기)

  const survey = new Model(json);
  survey.onComplete.add((sender, options) => {
    console.log(options, 'for eslint');
    console.log(JSON.stringify(sender.data, null, 3));
  });

  const [surveyCompleted, setSurveyCompleted] = useState(false);
  console.log(surveyCompleted, 'for eslint');

  survey.showCompleteButton = false;

  const handleNextButtonClick = () => {
    const surveyData = survey.data;
    console.log('Survey data:', surveyData);
    setSurveyCompleted(true);

    // 'Powerful CPU' 항목의 인덱스를 찾습니다.
    const indexOfA = surveyData['rank-trustworthy'].indexOf('DP A');

    // 해당 인덱스에 할당된 값을 변수에 저장합니다.
    // indexOfPowerfulCPU !== -1: 이 조건은 'Powerful CPU'가 배열에 존재하는지 확인합니다.요소가 존재하지 않으면 -1을 반환
    // indexOfPowerfulCPU + 1: 배열에서 찾아진 경우 해당 인덱스에 1을 더한 값을 powerfulCPUData 변수에 할당합니다.
    // null: 'Powerful CPU'가 배열에 존재하지 않는 경우, powerfulCPUData 변수에 null을 할당합니다.
    const dpAData = indexOfA !== -1 ? indexOfA + 1 : null;

    console.log('DP A data:', dpAData);
  };

  // on complete and console print
  survey.onComplete.add((sender, options) => {
    console.log(options, 'options');
    console.log("User's rankings:", sender.data.smartphoneFeatures);
  });

  return (
    <div className={className}>
      <div className="landing-wrapper">
        <div className="container d-flex">
          <div className="landing-container flex-grow-1">
            <div className="col-12 col-lg-8">
              <div className="row" style={{ marginBottom: '9px', marginTop: '200px' }}>
                <div>
                  {/* <h1 className="fw-bol">After Survey</h1> */}
                  <img src={eaMale} alt="Asian" style={{ width: '260px', height: '220px' }} />
                </div>
              </div>
              <div className="row" style={{ marginBottom: '36px' }}>
                <div>
                  <Survey model={survey} />
                </div>
              </div>
              <div className="row" style={{ marginBottom: '60px' }}>
                <div>
                  <Link
                    to="/presurvey1"
                    className="shadow btn primary-accent fs-3"
                    type="button"
                    onClick={handleNextButtonClick}
                  >
                    Next
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
PostSurvey1.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PostSurvey1;
// export default styled(PostSurvey1)`
//   .landing-wrapper {
//     min-height: 100vh;

//     background-size: auto 60%;
//     background-repeat: no-repeat;
//     background-position: bottom center;

//     @media (min-width: ${breakpoints.lg}px) {
//       background-size: 60% auto;
//       background-position: right bottom;
//     }
//   }
//   .landing-container {
//     padding-top: 1rem;
//     display: flex;
//     justify-content: center;

//     &>div {
//       background-color: ${Color(landingBackgroundColor).alpha(0.5)};
//       backdrop-filter: blur(10px);
//       border: 1px solid rgba(0,0,0,0.1);
//       padding: 1rem;
//       border-radius: 5px;
//       text-align: center;

//       @media (min-width: ${breakpoints.lg}px) {
//         border: none;
//       }
//     }
//   }
//   .form-switch .form-check-input {
//     min-width: 7rem;
//     height: 3rem;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;

//   .form-check.selected {
//     background-color:  #0062ff; /* 선택된 상태의 배경색을 원하는 색상으로 지정하세요. */
//     color: #0062ff; /* 선택된 상태의 텍스트 색상을 원하는 색상으로 지정하세요. */
//     border-radius: 50%; /* 동그라미 형태로 만들기 */
//     padding: 5px; /* 여백 추가 */
//   }

//     &.mic-switch::before, &.mic-switch.status-checked::after {
//         background-image: url(${micFill});
//     }
//     &.video-switch::before, &.video-switch.status-checked::after {
//         background-image: url(${videoFill});
//     }
//     &.mic-switch.status-checked::before, &.video-switch.status-checked::before {
//       background-image: none;
//     }

//     &.status-unchecked {
//       &::after {
//         content: 'OFF';
//         color: #000;
//         margin-right: 18%;
//       }
//       &::before {
//         background-size: 60%;
//         background-repeat: no-repeat;
//         background-color: rgb(220, 220, 220);
//         background-position: 45% center;
//         content: '';
//         display: block;

//         border-radius: 50%;

//         height: 80%;
//         margin-left: 5%;
//         aspect-ratio: 1;
//         float: right;
//       }
//     }

//     &.status-checked {
//       &::before {
//         content: 'ON';
//         color: #FFF;
//         margin-left: 22%;
//       }

//       &::after {
//         background-size: 60%;
//         background-repeat: no-repeat;
//         background-color: #FFF;
//         background-position: 55% center;
//         content: '';
//         display: block;

//         border-radius: 50%;

//         height: 80%;
//         margin-right: 5%;
//         aspect-ratio: 1;
//         float: right;
//       }
//     }
//   }
//   .row{
//     align-tiems: center;
//   }

//   .description{
//     font-size: 1.2rem;
//     line-height: 150%;
//     margin-top: 24px;
//   }

//   .noted{
//     font-size: 1.1rem;
//     margin-top: 20px;
//     font-weight: 600;
//   }

// `;
