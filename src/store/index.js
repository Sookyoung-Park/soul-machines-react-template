// import { configureStore } from '@reduxjs/toolkit';
// import smReducer from './sm';

import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // redux-thunk를 직접 import
import smReducer from './sm'; // setChatTypeState도 import

const store = configureStore({
  reducer: {
    sm: smReducer,
  },
  middleware: [thunk],
});

export default store;
