import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from './config/firebaseConfig';
import Router from './Router';
import store from './store';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './globalStyle';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);
console.log(db, 'connected firebaseConfig');

// const testA = doc(db, 'Projects/2345');
const testA = collection(db, 'Projects');
// function writeData() {
//   const testData = {
//     gender: 'testConfig',
//     race: 'racetestconfig',
//   };
//   try {
//     // Firestore에 데이터 추가
//     const docRef = await addDoc(testA, testData);
//     console.log('새로운 문서가 추가되었습니다. 문서 ID:', docRef.id);
//   } catch (error) {
//     console.error('데이터 추가 중 오류가 발생했습니다:', error);
//   }
//   // setDoc(testA, testData);
// }
async function writeData() {
  const testData = {
    gender: 'testConfig',
    race: 'racetestconfig',
  };

  try {
    // Firestore에 데이터 추가
    const docRef = await addDoc(testA, testData);
    console.log('새로운 문서가 추가되었습니다. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}
writeData();

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
