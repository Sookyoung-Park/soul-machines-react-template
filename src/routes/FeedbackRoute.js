import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { XCircle } from 'react-bootstrap-icons';
import FeedbackModal from '../components/FeedbackModal';

function Feedback({ className }) {
  const { presumeTimeout } = useSelector(({ sm }) => ({ ...sm }));

  const [alertModal, setAlertModal] = useState(null);

  useEffect(() => {
    if (presumeTimeout === true) {
      setAlertModal(
        <div className="alert-modal-card text-center">
          <div className="d-flex justify-content-end">
            <button type="button" style={{ border: 'none', background: 'none' }} onClick={() => setAlertModal(null)}>
              <XCircle size={20} />
            </button>
          </div>
          <h4 className="mb-3">
            The session timed out due to inactivity.
          </h4>
          <p>
            Please feel free to start again.
            Or give us some feedback to help us improve this exciting new platform.
          </p>
        </div>,
      );
    }
  }, [presumeTimeout]);

  const history = useHistory();

  return (
    <div className={className}>
      {
        alertModal !== null
          ? (
            <div className="alert-modal">
              { alertModal }
            </div>
          )
          : null
      }
      {/* <Header /> */}
      <div className="container">
        <FeedbackModal onClose={() => history.push('/loading')} closeText="Chat Again" />
      </div>
    </div>
  );
}

Feedback.propTypes = {
  className: PropTypes.string.isRequired,
};
export default styled(Feedback)`


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
