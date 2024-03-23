import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, doc, addDoc, updateDoc, getDoc,
  setDoc,
} from 'firebase/firestore';
import firebaseConfig from '../config/firebaseConfig';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const newDefDoc = collection(db, 'Projects');

// write new docID & user info
export async function writeUserInfo(gender, race, chatPrompts) {
  const userInfo = {
    gender,
    race,
    prompt_A: chatPrompts[0],
    prompt_B: chatPrompts[1],
    prompt_C: chatPrompts[2],
    prompt_D: chatPrompts[3],
  };

  try {
    const docRef = await addDoc(newDefDoc, userInfo);
    console.log('새로운 문서가 추가되었습니다. writeUserInfo');
    // console.log(docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
    return null;
  }
}

// updateExperimentType
export async function updateExperimentType(docID, A, B, C, D) {
  console.log('Firestore Stored:', A, B, C, D);
  const experimentData = {
    experiment_A: A,
    experiment_B: B,
    experiment_C: C,
    experiment_D: D,
    docID,
  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, experimentData);
    // console.log('experiment data 새로운 문서가 추가되었습니다. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('updateExperimentType 데이터 추가 중 오류가 발생했습니다:', error);
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
// update trustworhty_1
export async function updateTrustworthy1(docID, avatarType, score) {
  const Trustworthy1Data = {
    [`${avatarType}_trustworthy_1`]: score,
  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, Trustworthy1Data);
    console.log('trustworthy1 score updated. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

// update trustworhty_2
export async function updateTrustworthy2(docID, avatarType, score) {
  const Trustworthy2Data = {
    [`${avatarType}_trustworthy_2`]: score,
  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, Trustworthy2Data);
    console.log('trustworthy2 score updated. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

// update empathy_1
export async function updateEmpathy1(docID, avatarType, score) {
  const sympathizeScore1Data = {
    [`${avatarType}_empathy_1`]: score,
  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, sympathizeScore1Data);
    console.log('score updated. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

// update empathy_2
export async function updateEmpathy2(docID, avatarType, score) {
  const sympathizeScore2Data = {
    [`${avatarType}_empathy_2`]: score,
  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, sympathizeScore2Data);
    console.log('score updated. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

// good service_1
export async function updateGoodService1(docID, avatarType, score) {
  const GoodService1ScoreData = {
    [`${avatarType}_service_evaluation_1`]: score,
  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, GoodService1ScoreData);
    console.log('score updated. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

// good service_2
export async function updateGoodService2(docID, avatarType, score) {
  const GoodService2ScoreData = {
    [`${avatarType}_service_evaluation_2`]: score,
  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, GoodService2ScoreData);
    console.log('score updated. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

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
export async function updateAdjectives(docID, avatarType, adjectives) {
  const adjectivesData = {
    [`${avatarType}_adjectives`]: adjectives,
  };
  const docRef = doc(db, 'Projects', docID);
  try {
    await updateDoc(docRef, adjectivesData);
    console.log('adjectivesData updated. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

// 대화의 첫 번째 마디를 저장
export async function addConversationLog(docID, conversationLog) {
  const conversationLogData = {
    log: conversationLog,
  };
  const docRef = collection(db, `Projects/${docID}/conversation`);
  try {
    await setDoc(docRef, conversationLogData);
    console.log('conversation log updated. 문서 ID:', docRef.id);
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

// 대화의 두 번째 이후 마디를 업데이트
// export async function updateConversationLog(docID, conversationLog) {
//   const conversationLogData = {
//     log: conversationLog,
//   };
// conversationDocID는 대화 문서의 ID
//   const docRef = doc(db, `Projects/${docID}/conversation/conversationDocID`);
//   try {
//     await setDoc(docRef, conversationLogData); // 기존 문서를 덮어쓰기 때문에 setDoc을 사용합니다.
//     console.log('conversation log updated. 문서 ID:', docRef.id);
//   } catch (error) {
//     console.error('데이터 추가 중 오류가 발생했습니다:', error);
//   }
// }

export async function updateConversationLog(docID, newConversationLog, chatType) {
  try {
    const docRef = doc(db, `Projects/${docID}/conversations/${chatType}`);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const existingConversationLog = docSnapshot.data().log;

      // 새로운 대화 로그를 기존 대화 로그에 추가합니다.
      const updatedConversationLog = [...existingConversationLog, ...newConversationLog];
      await setDoc(docRef, { log: updatedConversationLog });
      console.log('conversation log updated. 문서 ID:', docRef.id);
    } else {
      // 새로운 문서를 생성하고 대화 로그를 추가합니다.
      await setDoc(docRef, { log: newConversationLog });
      console.log('New conversation log created. 문서 ID:', docRef.id);
    }
  } catch (error) {
    console.error('데이터 추가 중 오류가 발생했습니다:', error);
  }
}

// 원래 코드
// export async function updateConversationLog(docID, newConversationLog) {
//   try {
//     const docRef = doc(db, `Projects/${docID}/conversation/conversation${docID}`);
//     const docSnapshot = await getDoc(docRef);
//     if (docSnapshot.exists()) {
//       const existingConversationLog = docSnapshot.data().log;

//       // 중복 제거를 위해 새로운 대화 로그를 필터링합니다.
//       const filteredNewConversationLog = newConversationLog.filter((newConversation) => (
//         !existingConversationLog.includes(newConversation)
//       ));

//       // 필터링된 새로운 대화 로그를 기존 대화 로그에 추가합니다.
//       const updatedConversationLog = [...existingConversationLog, ...filteredNewConversationLog];
//       await setDoc(docRef, { log: updatedConversationLog });
//       console.log('conversation log updated. 문서 ID:', docRef.id);
//     } else {
//       await setDoc(docRef, { log: newConversationLog });
//       console.log('New conversation log created. 문서 ID:', docRef.id);
//     }
//   } catch (error) {
//     console.error('데이터 추가 중 오류가 발생했습니다:', error);
//   }
// }
