import { useState } from 'react';

import { TStep } from '@/components/stepper/types';

type UseStepperProps = {
  steps: TStep[];
};

export const useStepper = ({ steps }: UseStepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const StepComponent = steps[currentStep].component;
  return {
    currentStep,
    steps,
    StepComponent,
    handleNext,
    handleBack,
    isLastStep,
  } as const;
};
