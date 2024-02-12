import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, doc, addDoc, updateDoc, getDoc,
} from 'firebase/firestore';
import firebaseConfig from '../config/firebaseConfig';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const newDefDoc = collection(db, 'Projects');

// write new docID & user info
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

// updateExperimentType
export async function updateExperimentType(docID, A, B, C, D) {
  console.log('firebaesfucntion:', A, B, C, D);
  const experimentData = {
    experiment_A: A,
    experiment_B: B,
    experiment_C: C,
    experiment_D: D,
  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, experimentData);
    console.log('experiment data 새로운 문서가 추가되었습니다. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

// readAllExperimentTypes
export async function readAllExperimentTypes(docID) {
  const docRef = doc(db, 'Projects', docID);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const experimentTypes = [];
      // A, B, C, D의 데이터를 배열에 추가 string을 API_를 지우고 이미지형식으로
      experimentTypes.push(data.experiment_A.replace('API_', ''));
      experimentTypes.push(data.experiment_B.replace('API_', ''));
      experimentTypes.push(data.experiment_C.replace('API_', ''));
      experimentTypes.push(data.experiment_D.replace('API_', ''));
      console.log('experimentTypes:', experimentTypes);
      return experimentTypes; // 배열 반환
    }
    console.log('해당 문서가 존재하지 않습니다.');
    return null;
  } catch (error) {
    console.error('데이터 가져오기 중 오류가 발생했습니다:', error);
    return null;
  }
}

// after survey

// update TrustworthyRank
export async function updateTrustworthyRank(docID, rankA, rankB, rankC, rankD) {
  const trustworthyRankData = {
    trustworthy_rank_A: rankA,
    trustworthy_rank_B: rankB,
    trustworthy_rank_C: rankC,
    trustworthy_rank_D: rankD,

  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, trustworthyRankData);
    console.log('trustworthy rank data updated. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

// update intelligence rank
export async function updateIntelligenceRank(docID, rankA, rankB, rankC, rankD) {
  const intelligenceRankData = {
    intelligence_rank_A: rankA,
    intelligence_rank_B: rankB,
    intelligence_rank_C: rankC,
    intelligence_rank_D: rankD,

  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, intelligenceRankData);
    console.log('intelligence rank data updated. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

// update engagement rank
export async function updateEngagementRank(docID, rankA, rankB, rankC, rankD) {
  const engagementRankData = {
    engagemement_rank_A: rankA,
    engagemement_rank_B: rankB,
    engagemement_rank_C: rankC,
    engagemement_rank_D: rankD,

  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, engagementRankData);
    console.log('engagement rank data updated. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

// update adjectvies
export async function updateAdjectives(docID, adjectives) {
  const adjectivesData = {
    adjectives,
  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, adjectivesData);
    console.log('adjectivesData updated. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}
