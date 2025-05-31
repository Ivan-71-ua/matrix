import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { CorrectStatus } from '@/components/test/types';
import { Test, TestQuestion } from '@/types/test';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertDurationToSeconds = (duration: {
  hours: number;
  minutes: number;
}) => {
  return duration?.hours * 3600 + duration?.minutes * 60;
};

export const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
};

export const getAnswerStatus = (
  test: Test,
  questionId: string,
  isCompleted: boolean,
): CorrectStatus => {
  if (!isCompleted) return 'neutral';

  const question = test.questions.find((q) => q.id === questionId);
  if (!question) return 'neutral';

  if (question.type === 'multiple') {
    const allChosenCorrect = question.answers.every(
      (answer) => !answer.isChosen || answer.isCorrect,
    );
    if (allChosenCorrect) return 'correct';

    return question.answers.some((answer) => answer.isCorrect)
      ? 'neutral'
      : 'incorrect';
  }

  return question.answers.some((answer) => answer.isChosen && !answer.isCorrect)
    ? 'incorrect'
    : question.answers.some((answer) => answer.isChosen && answer.isCorrect)
      ? 'correct'
      : 'neutral';
};

export const calculateQuestionScore = (question: TestQuestion): number => {
  if (question.type === 'single') {
    return question.answers.some((a) => a.isChosen && a.isCorrect)
      ? question.points
      : 0;
  } else if (question.type === 'multiple') {
    const correctAnswers = question.answers.filter((a) => a.isCorrect).length;
    const chosenCorrect = question.answers.filter(
      (a) => a.isChosen && a.isCorrect,
    ).length;
    const chosenIncorrect = question.answers.filter(
      (a) => a.isChosen && !a.isCorrect,
    ).length;

    // Simple scoring: subtract incorrect choices from correct ones
    const score = chosenCorrect - chosenIncorrect;
    return score > 0 ? (question.points * score) / correctAnswers : 0;
  }
  return 0;
};

// Function to calculate the total score of the test
export const calculateTotalScore = (test: Test): number => {
  return test.questions.reduce(
    (total, question) => total + calculateQuestionScore(question),
    0,
  );
};
