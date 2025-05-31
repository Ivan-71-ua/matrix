import { useState } from 'react';

import { useFormContext, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

import ErrorMessage from '@/components/error-message/ErrorMessage';
import { CardContent, CardFooter } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TimePickerInput } from '@/components/ui/time-picker-input';

import StepperFooter from '../../stepper-footer/SteperFooter';
import { ConfigureTestFormValues, StepItemProps } from '../../types';

type ConfigureTestProps = StepItemProps;

const ConfigureTest: React.FC<ConfigureTestProps> = ({
  currentStep,
  handleBack,
  handleNext,
  steps,
}) => {
  const { control, trigger } = useFormContext<ConfigureTestFormValues>();
  const [testDurationHours, setTestDurationHours] = useState<Date | undefined>(
    undefined,
  );
  const [testDurationMinutes, setTestDurationMinutes] = useState<
    Date | undefined
  >(undefined);

  const handleNextStep = async () => {
    const isValid = await trigger([
      'testName',
      'testDuration.hours',
      'testDuration.minutes',
      'schedule',
    ]);
    if (isValid) {
      handleNext();
    } else {
      toast.error('Form is not valid. Please fill out all required fields.');
    }
  };

  return (
    <>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label>Test Name</Label>
          <Controller
            name="testName"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input
                  type="text"
                  className="rounded-md border px-3 py-2"
                  placeholder="Enter test name"
                  {...field}
                />
                {fieldState.error && (
                  <ErrorMessage message={fieldState.error.message} />
                )}
              </>
            )}
          />
        </div>
        <div className="grid gap-2">
          <Label>Test Duration</Label>
          <div className="flex items-center gap-2">
            <Controller
              name="testDuration.hours"
              control={control}
              render={({ field }) => (
                <>
                  <TimePickerInput
                    picker="hours"
                    date={testDurationHours}
                    setDate={(date) => {
                      setTestDurationHours(date);
                      field.onChange(date ? date.getHours() : 0);
                    }}
                    {...field}
                  />
                  <span>h</span>
                </>
              )}
            />
            <Controller
              name="testDuration.minutes"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TimePickerInput
                    picker="minutes"
                    date={testDurationMinutes}
                    setDate={(date) => {
                      setTestDurationMinutes(date);
                      field.onChange(date ? date.getMinutes() : 0);
                    }}
                    {...field}
                  />
                  <span>m</span>
                  {fieldState.error && (
                    <ErrorMessage message={fieldState.error.message} />
                  )}
                </>
              )}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Schedule</Label>
          <Controller
            name="schedule"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <DatePickerWithRange
                  className="w-full"
                  date={field.value}
                  setDate={(date) => {
                    field.onChange(date);
                  }}
                  {...field}
                />
                {fieldState.error && (
                  <ErrorMessage message={fieldState.error.message} />
                )}
              </>
            )}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <StepperFooter
          currentStep={currentStep}
          stepsLength={steps.length}
          handleNext={handleNextStep}
          handleBack={handleBack}
        />
      </CardFooter>
    </>
  );
};

export default ConfigureTest;
