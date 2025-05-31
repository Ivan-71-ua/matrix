import { TUser } from '@/types/auth';

import axiosInstance from './axios';

export const getUserData = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    const userData = response.data;
    return {
      ...userData,
      createdAt: new Date(userData.createdAt),
    } as TUser;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
export const updateUserData = async ({
  userId,
  data,
}: {
  userId: string;
  data: Partial<TUser>;
}) => {
  try {
    const response = await axiosInstance.patch(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};
