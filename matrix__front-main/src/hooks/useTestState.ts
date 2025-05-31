import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { convertDurationToSeconds } from '@/lib/utils';
import { Test } from '@/types/test';

import { useSendTestResult } from './useTests';
import { useTimer } from './useTimer';

type UseTestStateProps = {
  test: Test;
};

export function useTestState({ test }: UseTestStateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testResult, setTestResult] = useState<Test>(test);
  const totalDurationInSeconds = convertDurationToSeconds(test.duration);
  const { mutate, isPending } = useSendTestResult();
  const timeLeft = useTimer({ initialTime: totalDurationInSeconds });
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      toast.error('Time is up! Your test has been submitted.');
    }
  }, [timeLeft]);
  const handleAnswerSelect = (
    questionId: string,
    answerId: string,
    isChecked: boolean = true,
  ) => {
    const updatedQuestions = testResult.questions.map((question) => {
      if (question.id === questionId) {
        const updatedAnswers = question.answers.map((answer) => {
          if (question.type === 'single') {
            return { ...answer, isChosen: answer.id === answerId };
          }
          if (answer.id === answerId) {
            return { ...answer, isChosen: isChecked };
          }
          return answer;
        });
        return { ...question, answers: updatedAnswers };
      }
      return question;
    });

    setTestResult((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const handleNext = () => {
    if (
      testResult?.questions &&
      currentIndex < testResult.questions.length - 1
    ) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const finalTestResult = {
      testId: test.id,
      ...testResult,
    };

    mutate(
      { testResult: finalTestResult },
      {
        onSuccess: () => {
          navigate(`/test-result/${test.id}`);
        },
      },
    );
  };

  return {
    currentIndex,
    setCurrentIndex,
    timeLeft,
    handleAnswerSelect,
    handleNext,
    handlePrev,
    handleSubmit,
    currentQuestion: testResult?.questions[currentIndex],
    isPending,
  } as const;
}
