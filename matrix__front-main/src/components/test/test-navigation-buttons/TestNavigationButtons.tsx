import React from 'react';

import { Button } from '@/components/ui/button';

type NavigationButtonsProps = {
  currentIndex: number;
  totalQuestions: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
};

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentIndex,
  totalQuestions,
  handlePrev,
  handleNext,
  handleSubmit,
}) => {
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="w-full flex justify-between">
      <Button onClick={handlePrev} disabled={isFirstQuestion}>
        Back
      </Button>
      {isLastQuestion ? (
        <Button onClick={handleSubmit}>Submit</Button>
      ) : (
        <Button onClick={handleNext}>Next</Button>
      )}
    </div>
  );
};

export default NavigationButtons;
