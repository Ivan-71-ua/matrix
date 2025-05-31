import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import { TSignInCredentials, TSignUpCredentials } from '@/types/auth';

import axiosInstance from './axios';
import { auth } from '../firebase/firebaseConfig';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  return user;
};

export const signIn = async (credentials: TSignInCredentials) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password,
  );
  return userCredential.user;
};

export const signUp = async ({
  email,
  username,
  password,
  role,
}: TSignUpCredentials) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  await axiosInstance.post('/users', {
    uid: user.uid,
    email: user.email,
    username,
    role,
    description: '',
    createdAt: new Date(),
  });

  return user;
};
