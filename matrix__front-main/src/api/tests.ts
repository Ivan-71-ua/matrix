import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';

import { db } from '@/firebase/firebaseConfig';
import { TRole } from '@/types/auth';
import { GetTestByIdResponse, Test, TestResult } from '@/types/test';

export const getTestsByRole = async (
  userId: string,
  role: TRole,
): Promise<Test[]> => {
  const testsRef = collection(db, 'tests');

  let q;
  if (role === 'teacher') {
    q = query(testsRef, where('createdBy', '==', userId));
  } else {
    q = query(testsRef, where('studentsCompleted', 'array-contains', userId));
  }

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    createdAt: doc.data().createdAt?.toDate() ?? null,
    schedule: {
      from: doc.data().schedule.from.toDate(),
      to: doc.data().schedule.to.toDate(),
    },
  })) as Test[];
};

export const createTest = async (test: Test): Promise<void> => {
  await addDoc(collection(db, 'tests'), test);
};

export const deleteTest = async (testId: string) => {
  const testRef = doc(db, 'tests', testId);
  await deleteDoc(testRef);
};

export const getTestById = async (
  testId: string,
): Promise<GetTestByIdResponse> => {
  const testRef = doc(db, 'tests', testId);
  const testDoc = await getDoc(testRef);

  const data = testDoc.data();

  return {
    ...data,
    id: testId,
    createdAt: data?.createdAt?.toDate() ?? null,
    schedule: {
      from: data?.schedule?.from.toDate(),
      to: data?.schedule?.to.toDate(),
    },
  } as GetTestByIdResponse;
};

export const sendTestResult = async ({
  userId,
  testResult,
}: {
  userId: string;
  testResult: TestResult;
}): Promise<void> => {
  const testResultsRef = collection(db, 'testResults');
  const testRef = doc(db, 'tests', testResult.id);

  const batch = writeBatch(db);

  const testResultRef = doc(testResultsRef);
  batch.set(testResultRef, {
    ...testResult,
  });

  batch.update(testRef, {
    studentsCompleted: arrayUnion(userId),
  });

  await batch.commit();
};

export const getTestResults = async ({
  userId,
  testId,
}: {
  userId: string;
  testId: string;
}): Promise<TestResult> => {
  const testResultsRef = collection(db, 'testResults');
  const q = query(testResultsRef, where('userId', '==', userId));

  const querySnapshot = await getDocs(q);

  const testResult = querySnapshot.docs.find(
    (doc) => doc.data().testId === testId,
  );

  return testResult?.data() as TestResult;
};
