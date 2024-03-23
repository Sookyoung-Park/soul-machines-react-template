import React, {
  useState,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { headerHeight, landingBackgroundImage } from '../config';

function UsageCaseSelection({ className }) {
  // allow for custom input
//   const [customField, setCustomField] = useState('');
//   const [customItems, setCustomItems] = useState([]);

  // default tags
  const tagItems = ['Travel and Vacation', 'Health and Wellness', 'Sports and Exercise', 'Hobbies and Interests', 'Culture and Arts', 'Family and Friends', 'Study and Careers'];

  const [selectedTags, setSelectedTags] = useState([]);

  const handleSelectTag = (t) => {
    // const isCustom = customItems.indexOf(t) > -1;
    // if (isCustom) {
    //   const tagIsSelected = customItems.indexOf(t) > -1;
    //   if (tagIsSelected === false) setSelectedTags([...selectedTags, t]);
    //   // remove custom tag from array if selected again and set input as value so user can edit
    //   else {
    //     setSelectedTags([...selectedTags.filter((v) => v !== t)]);
    //     setCustomItems([...customItems.filter((v) => v !== t)]);
    //     setCustomField(t);
    //   }
    // } else {
    const tagIsSelected = selectedTags.indexOf(t) > -1;
    if (tagIsSelected === false) setSelectedTags([...selectedTags, t]);
    else setSelectedTags([...selectedTags.filter((v) => v !== t)]);
    // }
  };

  const [submitted, setSubmitted] = useState(false);
  console.log(submitted);

  return (
    <div className={className}>
      <div className="container feedback-container d-flex" style={{ marginTop: '120px' }}>
        <div className="container">
          <div>
            <div className="row">
              <h3 className="text-center">Please choose 4 prompts you would like to talk about</h3>
            </div>
            <hr />
            <div className="row">
              <div className="mt-3">
                {/* combine default tags and custom ones to display as one list */}
                {/* user can click on default tags to deselect and custom ones to edit */}
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
                    // if (customField !== '') {
                    //   setCustomItems([...customItems, customField]);
                    //   handleSelectTag(customField);
                    //   setCustomField('');
                    // }
                  }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="justify-content-end d-flex">
                <button
                  type="button"
                  className="btn btn-dark"
                //   disabled={!ratingSelected}
                  onClick={() => setSubmitted(true)}
                >
                  Submit
                </button>
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
  .feedback-container {
    height: calc(100vh - ${headerHeight});
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
