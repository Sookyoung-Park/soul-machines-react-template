import { createGlobalStyle } from 'styled-components';

export const primaryAccent = '#3c3c3c';

export default createGlobalStyle`
  body {
    height: 100vh;
    overflow: scroll;
  }
  svg {
    vertical-align: -0.125em;
  }
  .btn.primary-accent {
    border: 1px solid ${primaryAccent};
    background: ${primaryAccent};
    color: #FFF;
    
  }
  .form-check-input:checked {
    background-color: #00693e;
    border-color: #00693e;
  }
  .btn-unstyled {
    border: none;
    background: none;
  }
  .error-modal {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0,0,0,0.2);

    .error-modal-card {
      background: #FFF;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 10px;
      max-width: 30rem;
      padding: 1rem;
    }
    .error-modal-inner {
      padding: 1rem;
    }
  }
`;
