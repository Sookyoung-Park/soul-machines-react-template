// import firebase from "firebase/app"
// import "firebase/firestore";
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCk9sbJdPG1YaNmatTZvtwRvq4QNSoR41g",
//   authDomain: "soo-thesis-experiment-data.firebaseapp.com",
//   projectId: "soo-thesis-experiment-data",
//   storageBucket: "soo-thesis-experiment-data.appspot.com",
//   messagingSenderId: "521018269153",
//   appId: "1:521018269153:web:bf3d7d321fdda1f02d86a0",
//   measurementId: "G-NK2Q39HK8D"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// firebaseConfig.firestore();
// export default firebase;

import firebase from "firebase/app";
import "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk9sbJdPG1YaNmatTZvtwRvq4QNSoR41g",
  authDomain: "soo-thesis-experiment-data.firebaseapp.com",
  projectId: "soo-thesis-experiment-data",
  storageBucket: "soo-thesis-experiment-data.appspot.com",
  messagingSenderId: "521018269153",
  appId: "1:521018269153:web:bf3d7d321fdda1f02d86a0",
  measurementId: "G-NK2Q39HK8D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firestore 설정을 위해 firebase 객체를 사용합니다.
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
