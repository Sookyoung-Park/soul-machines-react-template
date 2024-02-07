// // Import the functions you need from the SDKs you need
// // import firebase from 'firebase/app';
// // import { getFirestore } from 'firebase/firestore';
// import 'firebase/firestore';
// // import { getFirestore, setDoc } from 'firebase/firestore';
// // import { initializeApp } from 'firebase/app';
// // import { getAnalytics } from 'firebase/analytics';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// console.log('Hello, firestore entered!!!!!!');
// // firebase
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyCk9sbJdPG1YaNmatTZvtwRvq4QNSoR41g',
//   authDomain: 'soo-thesis-experiment-data.firebaseapp.com',
//   projectId: 'soo-thesis-experiment-data',
//   storageBucket: 'soo-thesis-experiment-data.appspot.com',
//   messagingSenderId: '521018269153',
//   appId: '1:521018269153:web:bf3d7d321fdda1f02d86a0',
//   measurementId: 'G-NK2Q39HK8D',
// };

// // Initialize Cloud Firestore and get a reference to the service
// firebase.initializeApp(firebaseConfig);
// // const db=firebase.firestore();
// const firestore = firebase.firestore();

// const test = setDoc(fs, 'projects/123');
// function writeData(){
//     const testData = {
//         gender:'testConfig',
//         race:'racetestconfig',
//     };
//     setDoc(test,test)
// };

// console.log("Hello, firestore linked!!!!!!");

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// // console.log(analytics);
// // firebase.firestore().settings({ timestampsInSnapShots: true });

// export default firestore;

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: 'AIzaSyCk9sbJdPG1YaNmatTZvtwRvq4QNSoR41g',
  authDomain: 'soo-thesis-experiment-data.firebaseapp.com',
  projectId: 'soo-thesis-experiment-data',
  storageBucket: 'soo-thesis-experiment-data.appspot.com',
  messagingSenderId: '521018269153',
  appId: '1:521018269153:web:bf3d7d321fdda1f02d86a0',
  measurementId: 'G-NK2Q39HK8D',
};

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);

// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(firebaseApp);
// consol.log(db,'connected firebaseConfig');

export default firebaseConfig;
