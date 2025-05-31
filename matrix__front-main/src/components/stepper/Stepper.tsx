import { zodResolver } from '@hookform/resolvers/zod';
import { addDays } from 'date-fns';
import { FormProvider, useForm } from 'react-hook-form';

import { useStepper } from '@/hooks/useStepper';
import { useCreateTest } from '@/hooks/useTests';
import { configureTestSchema } from '@/lib/validationSchemes';

import { Card, CardHeader } from '../ui/card';
import StepperHeader from './components/stepper-header/StepperHeader';
import { steps } from './constants';
import { ConfigureTestFormValues } from './types';

const formInitialValues = {
  testName: '',
  testDuration: {
    hours: 0,
    minutes: 0,
  },
  schedule: {
    from: new Date(),
    to: addDays(new Date(), 1),
  },
  tests: [],
};

export default function Stepper() {
  const methods = useForm<ConfigureTestFormValues>({
    resolver: zodResolver(configureTestSchema),
    mode: 'onChange',
    defaultValues: formInitialValues,
  });

  const { currentStep, StepComponent, handleNext, handleBack, isLastStep } =
    useStepper({
      steps,
    });

  const { mutate } = useCreateTest();

  const onSubmit = async (data: ConfigureTestFormValues) => {
    mutate(data, {
      onSuccess: () => {
        handleNext();
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto py-4">
        <StepperHeader steps={steps} currentStep={currentStep} />
        <Card className="w-full px-8">
          <CardHeader className="text-center">
            <h1 className="text-xl font-bold">{steps[currentStep].title}</h1>
          </CardHeader>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <StepComponent
              currentStep={currentStep}
              handleNext={handleNext}
              handleBack={handleBack}
              isLastStep={isLastStep}
              steps={steps}
            />
          </form>
        </Card>
      </div>
    </FormProvider>
  );
}
