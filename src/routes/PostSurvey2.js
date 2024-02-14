import React, { useState, useEffect } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { readAllExperimentTypes, updateIntelligenceRank } from '../store/firestore_functions';

import EA_MALE from '../img/EA_MALE.png';
import EA_FEMALE from '../img/EA_FEMALE.png';
import AF_MALE from '../img/AF_MALE.png';
import AF_FEMALE from '../img/AF_FEMALE.png';
import CS_MALE from '../img/CS_MALE.png';
// import CS_FEMALE from '../img/CS_FEMALE.png';
import CS_FEMALE from '../img/CS_FEMALE.png';

const json = {
  elements: [
    {
      type: 'ranking',
      name: 'rank-intelligent',
      title: 'Which influncer did you feel the most intelligent from the most important to the least? ',
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

function PostSurvey2({ className }) {
  const { user } = useSelector(({ sm }) => ({ ...sm }));
  const { docID } = user.firebase;
  const { gender, race } = user.info;

  const [imgTitles, setImgTitles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readAllExperimentTypes(docID);
        setImgTitles(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 데이터 가져오기 함수 호출
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // console.log('xprm Tpyes', imgTitles); // 데이터 확인

  const getImagePath = (imgTitle) => {
    switch (imgTitle) {
      case 'EA_MALE':
        return EA_MALE;
      case 'EA_FEMALE':
        return EA_FEMALE;
      case 'AF_MALE':
        return AF_MALE;
      case 'AF_FEMALE':
        return AF_FEMALE;
      case 'CS_MALE':
        return CS_MALE;
      case 'CS_FEMALE':
        return CS_FEMALE;
      default:
        return null;
    }
  };

  const survey = new Model(json);
  survey.onComplete.add((sender, options) => {
    console.log(options, 'for eslint');
    console.log(JSON.stringify(sender.data, null, 3));
  });

  const infoString = `${race}_${gender}`;
  console.log('info string postsurvey: ', infoString);
  console.log('docID postsurvey', docID);

  const [surveyCompleted, setSurveyCompleted] = useState(false);
  console.log(surveyCompleted, 'for eslint');

  survey.showCompleteButton = false;

  const handleNextButtonClick = () => {
    const surveyData = survey.data;
    console.log('Survey data:', surveyData);
    setSurveyCompleted(true);

    // 'Powerful CPU' 항목의 인덱스를 찾습니다.
    const indexOfA = surveyData['rank-intelligent'].indexOf('DP A');
    const indexOfB = surveyData['rank-intelligent'].indexOf('DP B');
    const indexOfC = surveyData['rank-intelligent'].indexOf('DP C');
    const indexOfD = surveyData['rank-intelligent'].indexOf('DP D');

    // 해당 인덱스에 할당된 값을 변수에 저장합니다.
    // indexOfPowerfulCPU !== -1: 이 조건은 'Powerful CPU'가 배열에 존재하는지 확인합니다.요소가 존재하지 않으면 -1을 반환
    // indexOfPowerfulCPU + 1: 배열에서 찾아진 경우 해당 인덱스에 1을 더한 값을 powerfulCPUData 변수에 할당합니다.
    // null: 'Powerful CPU'가 배열에 존재하지 않는 경우, powerfulCPUData 변수에 null을 할당합니다.
    const dpARank = indexOfA !== -1 ? indexOfA + 1 : null;
    const dpBRank = indexOfB !== -1 ? indexOfB + 1 : null;
    const dpCRank = indexOfC !== -1 ? indexOfC + 1 : null;
    const dpDRank = indexOfD !== -1 ? indexOfD + 1 : null;
    // console.log('DP A data:', dpARank);
    // console.log('DP B data:', dpBRank);
    // console.log('DP C data:', dpCRank);
    // console.log('DP D data:', dpDRank);
    updateIntelligenceRank(docID, dpARank, dpBRank, dpCRank, dpDRank);
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
            <div className="col-12 col-lg-12">
              <div className="row" style={{ marginBottom: '9px', marginTop: '200px' }}>
                <div className="row" style={{ marginBottom: '9px' }}>
                  <div className="d-flex flex-wrap">
                    {/* imgA */}
                    <div className="column" style={{ marginRight: '20px', marginBottom: '9px' }}>
                      <img src={getImagePath(imgTitles[0])} alt={imgTitles[0]} style={{ width: '260px', height: '220px' }} />
                      <h4>DP A</h4>
                    </div>
                    {/* imgB */}
                    <div className="column" style={{ marginRight: '20px', marginBottom: '9px' }}>
                      <img src={getImagePath(imgTitles[1])} alt={imgTitles[1]} style={{ width: '260px', height: '220px' }} />
                      <h4>DP B</h4>
                    </div>
                    {/* imgC */}
                    <div className="column" style={{ marginRight: '20px', marginBottom: '9px' }}>
                      <img src={getImagePath(imgTitles[2])} alt={imgTitles[2]} style={{ width: '260px', height: '220px' }} />
                      <h4>DP C</h4>
                    </div>
                    {/* imgD */}
                    <div className="column" style={{ marginRight: '20px', marginBottom: '9px' }}>
                      <img src={getImagePath(imgTitles[3])} alt={imgTitles[3]} style={{ width: '260px', height: '220px' }} />
                      <h4>DP D</h4>
                    </div>
                  </div>
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
                    to="/ps3"
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
PostSurvey2.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PostSurvey2;
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
