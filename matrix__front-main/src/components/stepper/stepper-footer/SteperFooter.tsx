import React from 'react';

import { Button } from '@/components/ui/button';

interface StepperFooterProps {
  currentStep: number;
  stepsLength: number;
  handleNext: () => void;
  handleBack: () => void;
}

const StepperFooter: React.FC<StepperFooterProps> = ({
  currentStep,
  stepsLength,
  handleNext,
  handleBack,
}) => {
  const isSubmitButton = currentStep === stepsLength - 2; // it's review step, because the last step is the success step

  return (
    <>
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={currentStep === 0}
      >
        Back
      </Button>
      <Button
        type={isSubmitButton ? 'submit' : 'button'}
        onClick={isSubmitButton ? undefined : handleNext}
      >
        {isSubmitButton ? 'Finish' : 'Next'}
      </Button>
    </>
  );
};

export default StepperFooter;
