import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Star, StarFill } from 'react-bootstrap-icons';
import {
  Link,
  // useHistory
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import breakpoints from '../utils/breakpoints';
import { landingBackgroundImage } from '../config';
// import { setNextSurveyProgress } from '../store/sm';
// import { setSurveyProgressState } from '../store/sm';

function FeedbackModal({
  className, onClose, closeText,
  // denyFeedbackText, denyFeedback,
}) {
  const { user } = useSelector(({ sm }) => ({ ...sm }));
  const { surveyProgress } = user.surveyProgress;

  console.log(surveyProgress, ': saved sP in Feedback.js');

  // const dispatch = useDispatch();

  // onclick event for change chatType
  // const handleSurveyProgressChange = () => {
  //   dispatch(setNextSurveyProgress());
  //   console.log('new chatType', surveyProgress);
  // };

  // const [userChatType, setUserChatType] = useState(''); // 'A B C D'

  const nStars = 7;
  // I think A sympathize my feeling
  const [ratingSympathizeFeeling, setRatingSympathizeFeeling] = useState(-1);
  const [ratingSympathizeFeelingSelected, setRatingSympathizeFeelingSelected] = useState(false);

  // I think DP could be a good friend with me
  const [ratingGoodFriend, setRatingGoodFriend] = useState(-1);
  const [ratingGoodFriendSelected, setRatingGoodFriendSelected] = useState(false);

  // DP A provided a good service
  const [ratingGoodService, setRatingGoodService] = useState(-1);
  const [ratingGoodServiceSelected, setRatingGoodSerivceSelected] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  // const history = useHistory();

  // generate array of clickable stars for ratingSympathizeFeeling
  const starsSympathizeFeeling = Array.from(Array(nStars)).map((_, i) => {
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
        }}
      >
        {
        ratingSympathizeFeeling >= i
          ? <StarFill className="star star-fill" fill="#212529" />
          : <Star className="star star-outline" fill="#212529" />
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
        }}
      >
        {
          ratingGoodFriend >= i
            ? <StarFill className="star star-fill" fill="#212529" />
            : <Star className="star star-outline" fill="#212529" />
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
        }}
      >
        {
            ratingGoodService >= i
              ? <StarFill className="star star-fill" fill="#212529" />
              : <Star className="star star-outline" fill="#212529" />
          }
      </button>
    );
  });

  // allow for custom input
  const [customField, setCustomField] = useState('');
  // default tags
  const tagItems = ['Cheerful', 'Friendly', 'Warm', 'Enjoyful', 'Empathic'];
  const [selectedTags, setSelectedTags] = useState([]);
  const handleSelectTag = (t) => {
    const tagIsSelected = selectedTags.indexOf(t) > -1;
    if (tagIsSelected === false) setSelectedTags([...selectedTags, t]);
    else setSelectedTags([...selectedTags.filter((v) => v !== t)]);
  };

  return (
    <div className={className}>
      <div className="feedback-container">
        <div className="row d-flex justify-content-center">
          <div className="tutorial-icon tutorial-icon-dp mb-2" />
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
                Can you rate your experience with Digital Persona A?
              </h2>
            </div>
            <div className="row" />
            <hr />
            <div className="row">
              <h3>How would you describe your experience?</h3>
              <div>(Select all that apply)</div>
              <div className="mt-3">
                {/* combine default tags and custom ones to display as one list */}
                {/* user can click on default tags to deselect and custom ones to edit */}
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
            <div className="row">
              <div>
                <h3>I think A sympathize my feeling</h3>
              </div>
              <div className="row">
                <div
                  className="justify-content-left d-flex"
                  onMouseLeave={() => {
                    if (!ratingSympathizeFeelingSelected) setRatingSympathizeFeeling(-1);
                  }}
                >
                  {starsSympathizeFeeling}
                </div>
              </div>
            </div>
            <div className="row">
              <div>
                <h3>I think A could be your good friend with you</h3>
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
              <div>
                <h3>DP provided a good service</h3>
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
              <h3 style={{ marginTop: '10px' }}>Can you tell us more?</h3>
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
                    disabled={!ratingSympathizeFeelingSelected
                      || !ratingGoodFriendSelected || !ratingGoodServiceSelected}
                    onClick={() => {
                      setSelectedTags([...selectedTags, customField]);
                      setSubmitted(true);
                    }}
                  >
                    Submit
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
  }
  .star {
    width: 2rem;
    height: 2rem;
    margin: .4rem;

    @media (min-width: ${breakpoints.sm}px) {
      width: 2.6rem;
      height: 2.6rem;
      margin: 1rem;
    }
    @media (min-width: ${breakpoints.md}px) {
      width: 3.5rem;
      height: 3.5rem;
      margin: 1rem;
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

    background-color: #EAEAEA;
  }
  .tutorial-icon-dp {
    background-image: url(${landingBackgroundImage});
    background-size: cover;
    background-position: bottom center;
  }
`;
