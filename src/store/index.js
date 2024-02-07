// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk'; // redux-thunk를 직접 import
// import smReducer from './sm'; // setChatTypeState도 import

// const store = configureStore({
//   reducer: {
//     sm: smReducer,
//   },
//   middleware: [thunk],
// });
// export default store;
import { configureStore } from '@reduxjs/toolkit';
import firebase from '../config/firebaseConfig';
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore'; // firestore에서 가져오는 것을 추가해야 함
import rootReducer from '../Reducers/rootReducer';
import smReducer from './sm'; // setChatTypeState도 import

const store = configureStore({
  reducer: {
    sm: smReducer, // smReducer를 sm 키에 할당
    ...rootReducer, // 기존의 다른 리듀서들도 포함시킴
  },
  middleware: [thunk.withExtraArgument({ getFirebase })], // middleware 설정
});

const rrfProps = {
  firebase,
  config: {}, // Firebase 구성에 대한 설정을 여기에 추가
  dispatch: store.dispatch,
  createFirestoreInstance,
};

console.log(rrfProps, 'for eslint');

export default store;
