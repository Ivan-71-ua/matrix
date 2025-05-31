export type TRole = 'student' | 'teacher';

export type TSignUpCredentials = {
  email: string;
  password: string;
  username: string;
  role: TRole;
};

export type TSignInCredentials = {
  email: string;
  password: string;
};

export type TUser = {
  email: string;
  username: string;
  role: TRole;
  description: string;
  uid: string;
  createdAt: string;
};
