import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';

import { signIn, signUp } from '@/api/auth';
import { notificationSamples } from '@/lib/toasts';
import { TSignUpCredentials, TSignInCredentials } from '@/types/auth';

export const useSignOut = () => {
  const auth = getAuth();
  const queryClient = useQueryClient();

  const onSignOut = async () => {
    await signOut(auth)
      .catch(() => {
        toast.error(notificationSamples.auth.signOutError);
      })
      .then(() => {
        toast.success(notificationSamples.auth.signOutSuccess);
      });

    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  return { onSignOut };
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: TSignInCredentials) => signIn(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      toast.success(notificationSamples.auth.signInSuccess);
    },
    onError: () => {
      toast.error(notificationSamples.auth.signInError);
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (credentials: TSignUpCredentials) => signUp(credentials),
    onSuccess: () => {
      toast.success(notificationSamples.auth.signUpSuccess);
      window.location.reload();
    },
    onError: () => {
      toast.error(notificationSamples.auth.signUpError);
    },
  });
};
