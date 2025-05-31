import { DateRange } from 'react-day-picker';

export type QuestionType = 'single' | 'multiple';
export type TestStatus = 'upcoming' | 'ongoing' | 'ended';

export type Answer = {
  answer: string;
  isCorrect: boolean;
  id: string;
  isChosen?: boolean;
};

export type TestQuestion = {
  id: string;
  index: number;
  question: string;
  answers: Answer[];
  type: QuestionType;
  points: number;
};

export type Test = {
  id: string;
  name: string;
  duration: {
    hours: number;
    minutes: number;
  };
  questions: TestQuestion[];
  schedule: DateRange;
  createdAt: Date;
  createdBy: string;
  createdByName: string;
};

export type GetTestByIdResponse = Test & {
  studentsCompleted: string[];
};

export type TestResult = Omit<Test, 'studentsCompleted'> & {
  userId: string;
  testId: string;
};
