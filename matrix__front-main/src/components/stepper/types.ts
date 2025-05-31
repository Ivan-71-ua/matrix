import { DateRange } from 'react-day-picker';

import { TestQuestion } from '@/types/test';

export type ConfigureTestFormValues = {
  testName: string;
  testDuration: {
    hours: number;
    minutes: number;
  };
  schedule: DateRange;
  tests?: TestQuestion[];
};

export type TStep = {
  title: string;
  component: React.ComponentType<StepItemProps>;
};

export type StepItemProps = {
  currentStep: number;
  handleNext: () => void;
  handleBack: () => void;
  isLastStep: boolean;
  steps: TStep[];
};
