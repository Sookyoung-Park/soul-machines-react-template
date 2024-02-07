import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, doc, addDoc, updateDoc,
} from 'firebase/firestore';
import firebaseConfig from '../config/firebaseConfig';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const newDefDoc = collection(db, 'Projects');

export async function writeUserInfo(gender, race) {
  const userInfo = {
    gender,
    race,
  };

  try {
    const docRef = await addDoc(newDefDoc, userInfo);
    console.log('새로운 문서가 추가되었습니다. 문서 ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
    return null;
  }
}

export async function updateExperimentType(docID, A, B, C, D) {
  console.log('firebaesfucntion:', A, B, C, D);
  const experimentData = {
    experiment_A: A,
    experiment_B: B,
    experiment_C: C,
    experiment_D: D,
  };
  // const docRef = doc(db, 'Projects/${docRefID}', docRefID);
  const docRef = doc(db, 'Projects', docID);
  try {
    // const docRef = await addDoc(newDefDoc, experimentData);
    await updateDoc(docRef, experimentData);
    console.log('experiment data 새로운 문서가 추가되었습니다. 문서 ID:', docRef.id);
    console.log('need to be here', docID);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}
