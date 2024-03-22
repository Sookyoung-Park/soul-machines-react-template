import React, { useState, useEffect } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { readAllExperimentTypes, updateTrustworthyRank } from '../store/firestore_functions';

import EA_MALE from '../img/EA_MALE.png';
import EA_FEMALE from '../img/EA_FEMALE.png';
import AF_MALE from '../img/AF_MALE.png';
import AF_FEMALE from '../img/AF_FEMALE.png';
import CS_MALE from '../img/CS_MALE.png';
import CS_FEMALE from '../img/CS_FEMALE.png';
import CS_MALE_2 from '../img/CS_MALE_2.png';
import CS_FEMALE_2 from '../img/CS_FEMALE_2.png';
import HP_MALE from '../img/HP_MALE.png';
import HP_FEMALE from '../img/HP_FEMALE.png';
import HP_MALE_2 from '../img/HP_MALE_2.png';
import HP_FEMALE_2 from '../img/HP_FEMALE_2.png';
import AI_MALE from '../img/AI_MALE.png';
import AI_FEMALE from '../img/AI_FEMALE.png';
import SA_MALE from '../img/SA_MALE.png';
import SA_FEMALE from '../img/SA_FEMALE.png';

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

const survey = new Model(json);

function PostSurvey1({ className }) {
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
      case 'CS_MALE_2':
        return CS_MALE_2;
      case 'CS_FEMALE_2':
        return CS_FEMALE_2;
      case 'HP_MALE':
        return HP_MALE;
      case 'HP_FEMALE':
        return HP_FEMALE;
      case 'HP_MALE_2':
        return HP_MALE_2;
      case 'HP_FEMALE_2':
        return HP_FEMALE_2;
      case 'AI_MALE':
        return AI_MALE;
      case 'AI_FEMALE':
        return AI_FEMALE;
      case 'SA_MALE':
        return SA_MALE;
      case 'SA_FEMALE':
        return SA_FEMALE;
      default:
        return null;
    }
  };

  // const survey = new Model(json);

  const infoString = `${race}_${gender}`;
  console.log('info string postsurvey: ', infoString);
  console.log('docID postsurvey', docID);

  // original code
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  console.log(surveyCompleted, 'for eslint');

  survey.showCompleteButton = false;

  const handleNextButtonClick = () => {
    const surveyData = survey.data;
    console.log('Survey data:', surveyData);

    // 'Powerful CPU' 항목의 인덱스를 찾습니다.
    const indexOfA = surveyData['rank-trustworthy'].indexOf('DP A');
    const indexOfB = surveyData['rank-trustworthy'].indexOf('DP B');
    const indexOfC = surveyData['rank-trustworthy'].indexOf('DP C');
    const indexOfD = surveyData['rank-trustworthy'].indexOf('DP D');

    // 해당 인덱스에 할당된 값을 변수에 저장합니다.
    const dpARank = indexOfA !== -1 ? indexOfA + 1 : null;
    const dpBRank = indexOfB !== -1 ? indexOfB + 1 : null;
    const dpCRank = indexOfC !== -1 ? indexOfC + 1 : null;
    const dpDRank = indexOfD !== -1 ? indexOfD + 1 : null;
    // console.log('DP A data:', dpARank);
    // console.log('DP B data:', dpBRank);
    // console.log('DP C data:', dpCRank);
    // console.log('DP D data:', dpDRank);
    updateTrustworthyRank(docID, dpARank, dpBRank, dpCRank, dpDRank);

    setSurveyCompleted(true);
  // }, [survey.data]);
  };

  // on complete and console print
  // survey.onComplete.add((sender, options) => {
  //   console.log(options, 'options');
  //   console.log("User's rankings:", sender.data.smartphoneFeatures);
  // });
  // test
  useEffect(() => {
    if (survey) {
      // onComplete 이벤트 핸들러 추가
      survey.onComplete.add((sender, options) => {
        console.log(options, 'options');
        console.log("User's rankings:", sender.data.smartphoneFeatures);
      });
    }
  }, [survey]); // survey가 변경될 때마다 useEffect 호출

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
                    to="/ps2"
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
