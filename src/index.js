import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactTooltip from 'react-tooltip';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import firebaseConfig from './config/firebaseConfig';
import Router from './Router';
import store from './store';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './globalStyle';
// import writeData from './store/test_firestore';

// writeData();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
    <GlobalStyle />
    {/* globally enable react tooltips */}
    <ReactTooltip />
    {/* will be null if GA tracking is not enabled */}
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
