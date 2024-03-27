import React, {
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setChatPromptsState } from '../store/sm';

function UsageCaseSelection({ className }) {
  const [isSelectionMade, setIsSelectionMade] = useState(false);
  // const tagItems = ['Food and Cooking', 'Pet', 'Hometown', 'Hobbies and Interests',
  // 'Travle and Vacation',
  //  'Family and Friends',
  // 'Study and Careers', 'Current Events', 'The weekend',
  //   'Social Media', 'Fashion and Beauty'];
  const tagItems = ['Hobbies', 'Free Time', 'Sleep', 'Hometown', 'Vacations', 'Music', 'First Dates', 'Work',
    'Cooing & Food', 'Motivation', 'Beauty', 'Crime', 'Family and Friends',
    'Love', 'Goals', 'Dreams', 'Restaurants', 'Money', 'Shopping', 'Pets', 'Books', 'Sports', 'Life', 'Movies', 'Problems'];

  const [selectedTags, setSelectedTags] = useState([]);

  const handleSelectTag = (t) => {
    const tagIsSelected = selectedTags.indexOf(t) > -1;
    if (tagIsSelected === false) setSelectedTags([...selectedTags, t]);
    else setSelectedTags([...selectedTags.filter((v) => v !== t)]);
    if (selectedTags.length === 3) {
      setIsSelectionMade(true);
    } else {
      setIsSelectionMade(false);
    }
  };

  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);
  console.log(submitted, 'for eslint');

  const handleSubmit = () => {
    setSubmitted(true);
    dispatch(setChatPromptsState(selectedTags));
  };

  return (
    <div className={className}>
      <div className="d-flex" style={{ marginTop: '200px' }}>
        <div className="container-prompt">
          <div>
            <div className="row">
              <h3 className="text-center">Please choose 4 prompts you would like to talk about</h3>
            </div>
            <hr />
            <div className="row">
              <div className="mt-3">
                {[...tagItems].map((t) => (
                  <button
                    className={`rating-tag ${selectedTags.indexOf(t) > -1 ? 'rating-tag-selected' : ''}`}
                    type="button"
                    onClick={() => handleSelectTag(t)}
                  >
                    {t}
                  </button>
                ))}
                <form
                  className="d-inline-block"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="justify-content-end d-flex">
                {isSelectionMade && (
                <Link
                  to="/landingafter"
                  className="shadow btn primary-accent fs-3 StartButton"
                  type="button"
                  disabled={selectedTags.length !== 4}
                  onClick={handleSubmit}
                >
                  Next
                </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UsageCaseSelection.propTypes = {
  className: PropTypes.string.isRequired,
};
export default styled(UsageCaseSelection)`
  .container-prompt {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    margin-left: auto;
    margin-right: auto;
    padding-left: calc(var(--bs-gutter-x)* 2);
    padding-right: calc(var(--bs-gutter-x)* 2);
    width: 50%;
  }
  .star-wrapper {
    display: inline;
    margin: 1rem;
    border: none;
    background: #FFF;
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
      background: #00693e;
      color: #FFF;
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
  .alert-modal {
    position: absolute;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    background: rgba(0,0,0,0.3);
  }
  .alert-modal-card {
    background: #FFF;
    padding: 1.3rem;
    max-width: 25rem;
    border-radius: 5px;
  }
`;
