import { useAuthContext } from '@/providers/AuthProvider';

export const useGetUser = () => {
  const { user } = useAuthContext();

  if (!user) {
    throw new Error('User is not available yet');
  }

  return { user } as const;
};
