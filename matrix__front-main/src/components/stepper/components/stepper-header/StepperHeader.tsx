import React from 'react';

import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StepperHeaderProps {
  steps: { title: string }[];
  currentStep: number;
}

const StepperHeader: React.FC<StepperHeaderProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <div className="flex items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold',
                  currentStep > index
                    ? 'border-primary bg-primary text-primary-foreground'
                    : currentStep === index
                      ? 'border-primary text-primary'
                      : 'border-muted text-muted-foreground',
                )}
              >
                {currentStep > index ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  'ml-2 hidden text-sm font-medium sm:inline-block',
                  currentStep >= index
                    ? 'text-primary'
                    : 'text-muted-foreground',
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'mx-4 h-0.5 w-20',
                  currentStep > index + 1
                    ? 'bg-primary'
                    : 'bg-muted-foreground/30',
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepperHeader;
