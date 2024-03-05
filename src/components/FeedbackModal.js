import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Star, StarFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import breakpoints from '../utils/breakpoints';
import { landingBackgroundImage } from '../config';
import {
  updateAdjectives,
  updateGoodFriendScore,
  updateGoodServiceScore,
  readAllExperimentTypes,
  updateTrustworthy1,
  updateTrustworthy2,
  updateEmpathy1,
  updateEmpathy2,
} from '../store/firestore_functions';
import { setNextSurveyProgress } from '../store/sm/index';

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

function FeedbackModal({ className, onClose, closeText }) {
  const { user } = useSelector(({ sm }) => ({ ...sm }));
  const { docID } = user.firebase;
  const { surveyProgress } = user.surveyProgress;

  const dispatch = useDispatch();

  console.log(surveyProgress, ': saved sP in Feedback.js');

  const [imgTitles, setImgTitles] = useState([]);

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
      case 'CS_MALE_2':
        return CS_MALE_2;
      case 'CS_FEMALE':
        return CS_FEMALE;
      case 'CS_FEMALE_2':
        return CS_FEMALE_2;
      case 'HP_MALE':
        return HP_MALE;
      case 'HP_MALE_2':
        return HP_MALE_2;
      case 'HP_FEMALE':
        return HP_FEMALE;
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

  const nStars = 7;
  // trustworthiness1 - I could predict the Avatar[N]'s reaction.
  const [ratingPredictReaction, setRatingPredictReaction] = useState(-1);
  const [ratingPredictReactionSelected, setRatingPredictReactionSelected] = useState(false);

  // trustworthiness2 - AI avatar is honest and sincere in the interactions.
  const [ratingHonestSincere, setRatingHonestSincere] = useState(-1);
  const [ratingHonestSincereSelected, setRatingHonestSincereSelected] = useState(false);

  // sympathize1 - I could feel Avatars emotion during the conversation
  const [ratingSympathizeFeeling, setRatingSympathizeFeeling] = useState(-1);
  const [ratingSympathizeFeelingSelected, setRatingSympathizeFeelingSelected] = useState(false);

  // sympathize2 - I could understand Avatars emotion state.
  const [ratingUnderstandEmotion, setRatingUnderstandEmotion] = useState(-1);
  const [ratingUnderstandEmotionSelected, setRatingUnderstandEmotionSelected] = useState(false);

  // need to fix from here

  // I think DP could be a good friend with me
  const [ratingGoodFriend, setRatingGoodFriend] = useState(-1);
  const [ratingGoodFriendSelected, setRatingGoodFriendSelected] = useState(false);

  // DP A provided a good service
  const [ratingGoodService, setRatingGoodService] = useState(-1);
  const [ratingGoodServiceSelected, setRatingGoodSerivceSelected] = useState(false);

  // adjectives
  const [selectedTags, setSelectedTags] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const convertLetterToNr = (letter) => {
    const letterMap = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
    };
    return letterMap[letter];
  };

  const ImgIdx = convertLetterToNr(surveyProgress);

  const handleSubmit = () => {
    dispatch(setNextSurveyProgress());
    // window.location.reload();

    if (surveyProgress === 'D') {
      setSubmitted(true);
    }
    setRatingGoodFriend(-1);
    setRatingGoodFriendSelected(false);
    setRatingGoodService(-1);
    setRatingGoodSerivceSelected(false);
    setSelectedTags([]);
    // trustworthiness
    setRatingPredictReaction(-1);
    setRatingPredictReactionSelected(false);
    setRatingHonestSincere(-1);
    setRatingHonestSincereSelected(false);
    // empathy
    setRatingSympathizeFeeling(-1);
    setRatingSympathizeFeelingSelected(false);
    setRatingUnderstandEmotionSelected(-1);
    setRatingUnderstandEmotionSelected(false);
    // setCustomField('');
  };

  // [EA_MALE, AF_FEMALE etc]
  let experimentData;
  useEffect(() => {
    const fetchData = async () => {
      try {
        experimentData = await readAllExperimentTypes(docID);
        setImgTitles(experimentData);
        // console.log(experimentData, 'feedbackmodal readAllExperimentTypes');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 데이터 가져오기 함수 호출
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // trustworthy1 (predict reaction) - generate array of clickable stars for ratingSympathizeFeeling
  const starsTrustworthy1 = Array.from(Array(nStars)).map((_, i) => {
    const handleHover = () => {
      if (!ratingPredictReactionSelected) setRatingPredictReaction(i);
    };
    return (
      <button
          // eslint-disable-next-line react/no-array-index-key
        key={i}
        className="star-wrapper"
        type="button"
        onMouseOver={handleHover}
        onFocus={handleHover}
        onClick={() => {
          setRatingPredictReaction(i);
          setRatingPredictReactionSelected(true);
          updateTrustworthy1(docID, surveyProgress, i + 1);
        }}
      >
        {
          ratingPredictReaction >= i
            ? <StarFill className="star star-fill" fill="#63c980" />
            : <Star className="star star-outline" fill="#d5e3d9" />
        }
      </button>
    );
  });

  // trustworthy2 (honest and sincere) - generate array of clickable stars
  const starsTrustworthy2 = Array.from(Array(nStars)).map((_, i) => {
    const handleHover = () => {
      if (!ratingHonestSincereSelected) setRatingHonestSincere(i);
    };
    return (
      <button
            // eslint-disable-next-line react/no-array-index-key
        key={i}
        className="star-wrapper"
        type="button"
        onMouseOver={handleHover}
        onFocus={handleHover}
        onClick={() => {
          setRatingHonestSincere(i);
          setRatingHonestSincereSelected(true);
          updateTrustworthy2(docID, surveyProgress, i + 1);
        }}
      >
        {
            ratingHonestSincere >= i
              ? <StarFill className="star star-fill" fill="#63c980" />
              : <Star className="star star-outline" fill="#d5e3d9" />
          }
      </button>
    );
  });

  // empathy1 (could feel Avatar's emotion - generate array of clickable stars
  const starsEmpathy1 = Array.from(Array(nStars)).map((_, i) => {
    const handleHover = () => {
      if (!ratingSympathizeFeelingSelected) setRatingSympathizeFeeling(i);
    };
    return (
      <button
          // eslint-disable-next-line react/no-array-index-key
        key={i}
        className="star-wrapper"
        type="button"
        onMouseOver={handleHover}
        onFocus={handleHover}
        onClick={() => {
          setRatingSympathizeFeeling(i);
          setRatingSympathizeFeelingSelected(true);
          updateEmpathy1(docID, surveyProgress, i + 1);
        }}
      >
        {
          ratingSympathizeFeeling >= i
            ? <StarFill className="star star-fill" fill="#63c980" />
            : <Star className="star star-outline" fill="#d5e3d9" />
        }
      </button>
    );
  });

  // empathy2 - I could understand Avatars emotion state.
  const starsEmpathy2 = Array.from(Array(nStars)).map((_, i) => {
    const handleHover = () => {
      if (!ratingUnderstandEmotionSelected) setRatingUnderstandEmotion(i);
    };
    return (
      <button
            // eslint-disable-next-line react/no-array-index-key
        key={i}
        className="star-wrapper"
        type="button"
        onMouseOver={handleHover}
        onFocus={handleHover}
        onClick={() => {
          setRatingUnderstandEmotion(i);
          setRatingUnderstandEmotionSelected(true);
          updateEmpathy2(docID, surveyProgress, i + 1);
        }}
      >
        {
            ratingUnderstandEmotion >= i
              ? <StarFill className="star star-fill" fill="#63c980" />
              : <Star className="star star-outline" fill="#d5e3d9" />
          }
      </button>
    );
  });

  // generate array of clickable stars for ratingGoodFriend
  const starsRatingGoodFriend = Array.from(Array(nStars)).map((_, i) => {
    const handleHover = () => {
      if (!ratingGoodFriendSelected) setRatingGoodFriend(i);
    };
    return (
      <button
          // eslint-disable-next-line react/no-array-index-key
        key={i}
        className="star-wrapper"
        type="button"
        onMouseOver={handleHover}
        onFocus={handleHover}
        onClick={() => {
          setRatingGoodFriend(i);
          setRatingGoodFriendSelected(true);
          updateGoodFriendScore(docID, surveyProgress, i + 1);
        }}
      >
        {
          ratingGoodFriend >= i
            ? <StarFill className="star star-fill" fill="#63c980" />
            : <Star className="star star-outline" fill="#d5e3d9" />
        }
      </button>
    );
  });

  // generate array of clickable stars for ratingGoodService
  const starsRatingGoodService = Array.from(Array(nStars)).map((_, i) => {
    const handleHover = () => {
      if (!ratingGoodServiceSelected) setRatingGoodService(i);
    };
    return (
      <button
            // eslint-disable-next-line react/no-array-index-key
        key={i}
        className="star-wrapper"
        type="button"
        onMouseOver={handleHover}
        onFocus={handleHover}
        onClick={() => {
          setRatingGoodService(i);
          setRatingGoodSerivceSelected(true);
          updateGoodServiceScore(docID, surveyProgress, i + 1);
        }}
      >
        {
            ratingGoodService >= i
              ? <StarFill className="star star-fill" fill="#63c980" />
              : <Star className="star star-outline" fill="#d5e3d9" />
          }
      </button>
    );
  });

  // allow for custom input
  const [customField, setCustomField] = useState('');
  const tagItems = ['Predictable', 'Kind', 'Professional', 'Intelligent', 'Friendly', 'Dependant', 'Honest', 'Warm', 'Satisfying'];

  const handleSelectTag = (t) => {
    const tagIsSelected = selectedTags.indexOf(t) > -1;
    if (tagIsSelected === false) setSelectedTags([...selectedTags, t]);
    else setSelectedTags([...selectedTags.filter((v) => v !== t)]);
  };

  return (
    <div className={className}>
      <div className="feedback-container">
        <div className="row d-flex justify-content-center">
          {/* <div className="tutorial-icon tutorial-icon-dp mb-2" /> */}
          <div className="tutorial-icon mb-2">
            {ImgIdx <= 3 && (
            <img
              src={getImagePath(imgTitles[ImgIdx])}
              alt="none"
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'bottom center',
              }}
            />
            )}
          </div>
        </div>
        {submitted ? (
          <div>
            <div className="row text-center">
              <h2>Thank you for your feedback.</h2>
              <p>Want to keep chatting? If not, we can end our conversation.</p>
            </div>
            <div className="row">
              <div className="d-flex justify-content-center">
                <button
                  onClick={onClose}
                  type="button"
                  className="btn btn-dark me-4"
                >
                  {closeText}
                </button>
                <Link to="/" className="btn btn-outline-dark" type="button">
                  I&apos;m Done
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="row" />
            <div className="row">
              <h2 className="text-center">
                Can you rate your experience with Avatar
                {' '}
                {String(surveyProgress)}
                ?
              </h2>
            </div>
            <div className="row" />
            <hr />
            <div className="row" style={{ marginTop: '32px' }}>
              <h4>How would you describe your experience?</h4>
              <p> (Please Select All that Apply)</p>
              <div className="mt-3">
                {tagItems.map((t) => (
                  <button
                    className={`rating-tag ${
                      selectedTags.indexOf(t) > -1 ? 'rating-tag-selected' : ''
                    }`}
                    type="button"
                    onClick={() => handleSelectTag(t)}
                    key={t}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3">
              {/* <SurveyComponent /> */}
            </div>
            {/* test */}
            <div className="row">
              <div style={{ marginTop: '16px' }}>
                <h4>
                  I could predict the AI avatar&apos;s reaction.
                </h4>
                <p style={{ fontSize: '1.2em' }}>(1= &apos;never Predictable&apos; and 7= &apos;very predictable&apos;)</p>
              </div>
              <div className="row">
                <div
                  className="justify-content-left d-flex"
                  onMouseLeave={() => {
                    if (!ratingPredictReactionSelected) setRatingPredictReaction(-1);
                  }}
                >
                  {starsTrustworthy1}
                </div>
              </div>
            </div>
            {/* test */}
            <div className="row">
              <div style={{ marginTop: '16px' }}>
                <h4>
                  AI avatar is honest and sincere during the conversation.
                </h4>
                <p style={{ fontSize: '1.2em' }}>(1= &apos;never honest and sincere&apos; and 7= &apos;very honest and sincere&apos;)</p>
              </div>
              <div className="row">
                <div
                  className="justify-content-left d-flex"
                  onMouseLeave={() => {
                    if (!ratingHonestSincereSelected) setRatingHonestSincere(-1);
                  }}
                >
                  {starsTrustworthy2}
                </div>
              </div>
            </div>
            <div className="row">
              <div style={{ marginTop: '16px' }}>
                <h4>I could feel AI avatar&apos;s emotion during the conversation.</h4>
                <p style={{ fontSize: '1.2em' }}>(1= &apos;never feel&apos; and 7= &apos;totally feel&apos;)</p>
              </div>
              <div className="row">
                <div
                  className="justify-content-left d-flex"
                  onMouseLeave={() => {
                    if (!ratingSympathizeFeelingSelected) setRatingSympathizeFeeling(-1);
                  }}
                >
                  {starsEmpathy1}
                </div>
              </div>
            </div>
            <div className="row">
              <div style={{ marginTop: '16px' }}>
                <h4>I could understand AI avatar&apos;s emotion state</h4>
                <p style={{ fontSize: '1.2em' }}>(1= &apos;never understand&apos; and 7= &apos;totally understand&apos;)</p>
              </div>
              <div className="row">
                <div
                  className="justify-content-left d-flex"
                  onMouseLeave={() => {
                    if (!ratingUnderstandEmotionSelected) setRatingUnderstandEmotion(-1);
                  }}
                >
                  {starsEmpathy2}
                </div>
              </div>
            </div>
            <div className="row">
              <div style={{ marginTop: '32px' }}>
                <h4>I think A could be your good friend with you</h4>
              </div>
              <div className="row">
                <div
                  className="justify-content-left d-flex"
                  onMouseLeave={() => {
                    if (!ratingGoodFriendSelected) setRatingGoodFriend(-1);
                  }}
                >
                  {starsRatingGoodFriend}
                </div>
              </div>
            </div>
            <div className="row">
              <div style={{ marginTop: '32px' }}>
                <h4>DP provided a good service</h4>
              </div>
              <div className="row">
                <div
                  className="justify-content-left d-flex"
                  onMouseLeave={() => {
                    if (!ratingGoodServiceSelected) setRatingGoodService(-1);
                  }}
                >
                  {starsRatingGoodService}
                </div>
              </div>
            </div>
            <div className="row">
              <h4 style={{ marginTop: '32px' }}>Can you tell us more?</h4>
              {/* field for custom tags, limited to 20 chars */}
              <div
                className="d-flex custom-items"
                style={{ width: '100%', height: '100px', marginTop: '10px' }}
              >
                <textarea
                  type="text"
                  className="form-control me-2"
                  onChange={(e) => {
                    const t = e.target.value;
                    if (t.length < 265) setCustomField(t);
                  }}
                  value={customField}
                />
              </div>
              <div className="row mt-3">
                <div className="justify-content-end d-flex">
                  {/* <button
                    onClick={() => (denyFeedback ? denyFeedback() : history.push('/'))}
                    type="button"
                    className="btn btn-outline-dark me-2"
                  >
                    { denyFeedbackText || 'No Thanks' }
                  </button> */}
                  <button
                    type="button"
                    className="btn btn-dark"
                    disabled={!ratingHonestSincere || !ratingPredictReaction
                      || !ratingSympathizeFeelingSelected || !ratingUnderstandEmotionSelected
                      || !ratingGoodFriendSelected || !ratingGoodServiceSelected}
                    onClick={() => {
                      setSelectedTags([...selectedTags, customField]);
                      // setSubmitted(true);
                      const adj = [...selectedTags];
                      updateAdjectives(docID, surveyProgress, adj);
                      handleSubmit();
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

FeedbackModal.propTypes = {
  className: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  closeText: PropTypes.string,
  // denyFeedbackText: PropTypes.string.isRequired,
  // denyFeedback: PropTypes.string.isRequired,
};

FeedbackModal.defaultProps = {
  closeText: 'Close',
};

export default styled(FeedbackModal)`
  .star-wrapper {
    display: inline;
    border: none;
    background: #FFF;
    margin: 0;
  }
  .star {
    width: 1.1rem;
    height: 1.1rem;
    margin: .2rem;

    @media (min-width: ${breakpoints.sm}px) {
      width: 2.6rem;
      height: 2.6rem;
      margin: 0.2rem;
    }
    @media (min-width: ${breakpoints.md}px) {
      width: 3.5rem;
      height: 3.5rem;
      margin: 0.2rem;
    }
  }
  .rating-tag {
    display: inline;
    margin-right: 0.6rem;
    margin-bottom: 0.6rem;
    padding: .5rem;

    font-size: 1.3rem;

    background: #FFF;
    border: 1px solid gray;
    border-radius: 5px;

    max-width: 15rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.rating-tag-selected {
      background: #212529;
      color: #FFF;
      &:hover {
        background: #0e1012;
        color: #FFF;
      }
    }
    &:hover {
      background: #DCDCDC;
    }

  }

  .custom-items {
    width: 20rem;

    button, input {
      font-size: 1.3rem;
      padding: .5rem;
    }
    input {
      border: 1px solid gray;
    }
  }

  .tutorial-icon {
    width: 180px;
    aspect-ratio: 1;
    border-radius: 50%;

    display: flex;
    align-items: center;  
    justify-content: center;

  }
  .tutorial-icon-dp {
    background-image: url(${landingBackgroundImage});
    background-size: cover;
    background-position: bottom center;
  }
`;
