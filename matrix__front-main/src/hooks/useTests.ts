import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  getTestsByRole,
  createTest,
  deleteTest,
  getTestById,
  sendTestResult,
  getTestResults,
} from '@/api/tests';
import { ConfigureTestFormValues } from '@/components/stepper/types';
import { Test, TestResult } from '@/types/test';

import { useGetUser } from './useGetUser';
type GetTestsByRoleParams = {
  userId: string;
  role: 'teacher' | 'student';
};

export const useGetTestsByRole = ({ userId, role }: GetTestsByRoleParams) => {
  return useQuery<Test[], Error>({
    queryKey: ['tests', userId],
    queryFn: () => getTestsByRole(userId, role),
    enabled: !!userId,
  });
};

export const useCreateTest = () => {
  const queryClient = useQueryClient();
  const { user } = useGetUser();

  return useMutation({
    mutationFn: (data: ConfigureTestFormValues) =>
      createTest({
        id: crypto.randomUUID(),
        name: data.testName,
        duration: data.testDuration,
        questions: data.tests || [],
        schedule: data.schedule,
        createdAt: new Date(),
        createdBy: user.uid,
        createdByName: user.username,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
      toast.success('Test created successfully');
    },
    onError: (e) => {
      toast.error('Error creating test');
      console.error(e);
    },
  });
};

export const useDeleteTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (testId: string) => deleteTest(testId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
      toast.success('Test deleted successfully');
    },
    onError: () => {
      toast.error('Error deleting test');
    },
  });
};

export const useGetTestById = (testId: string) => {
  return useQuery({
    queryKey: ['test', testId],
    queryFn: () => getTestById(testId),
    enabled: !!testId,
  });
};

export const useSendTestResult = () => {
  const { user } = useGetUser();

  return useMutation({
    mutationFn: ({ testResult }: { testResult: Omit<TestResult, 'userId'> }) =>
      sendTestResult({
        userId: user.uid,
        testResult: {
          ...testResult,
          userId: user.uid,
        },
      }),
    onSuccess: () => {
      toast.success('Test submitted successfully');
    },
    onError: () => {
      toast.error('Error submitting test');
    },
  });
};

export const useGetTestResults = ({ testId }: { testId: string }) => {
  const { user } = useGetUser();
  return useQuery({
    queryKey: ['testResults', user.uid, testId],
    queryFn: () =>
      getTestResults({
        userId: user.uid,
        testId,
      }),
    enabled: !!user.uid && !!testId && user.role === 'student',
  });
};
