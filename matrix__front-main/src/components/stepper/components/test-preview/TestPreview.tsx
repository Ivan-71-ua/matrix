import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ConfigureTestFormValues } from '@/lib/validationSchemes';
import { TestQuestion } from '@/types/test';

import StepperFooter from '../../stepper-footer/SteperFooter';
import { StepItemProps } from '../../types';

type TestPreviewProps = StepItemProps;

export default function TestPreview({
  currentStep,
  handleBack,
  steps,
  handleNext,
}: TestPreviewProps) {
  const { getValues } = useFormContext<ConfigureTestFormValues>();
  const values = getValues();

  const renderAnswers = (test: TestQuestion, index: number) => (
    <ul>
      {test.type === 'multiple' ? (
        test.answers.map((answer, idx: number) => (
          <li key={idx} className="flex items-center mb-1">
            <Checkbox className="mr-2" checked={answer.isCorrect} />
            <Label className="text-lg font-normal">{answer.answer}</Label>
            {answer.isCorrect && (
              <span className="text-muted-foreground">(Correct)</span>
            )}
          </li>
        ))
      ) : (
        <RadioGroup
          name={`question-${index}`}
          defaultValue={
            test.answers.find((answer) => answer.isCorrect)?.answer || ''
          }
        >
          {test.answers.map((answer, idx: number) => (
            <div key={idx} className="flex items-center space-x-2">
              <RadioGroupItem
                value={answer.answer}
                id={`radio-${index}-${idx}`}
                checked={answer.isCorrect}
              />
              <Label
                className="text-lg font-normal"
                htmlFor={`radio-${index}-${idx}`}
              >
                {answer.answer}
              </Label>
              {answer.isCorrect && (
                <span className="text-muted-foreground">(Correct)</span>
              )}
            </div>
          ))}
        </RadioGroup>
      )}
    </ul>
  );
  return (
    <>
      <CardContent>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold">Test Name:</h3>
          <p className="font-semibold">{values.testName}</p>
        </div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold">Test Duration:</h3>
          <p className="font-semibold">
            {values.testDuration.hours} hours {values.testDuration.minutes}{' '}
            minutes
          </p>
        </div>
        <div className="flex items-center justify-between ">
          <h3 className="font-semibold">Schedule:</h3>
          <p className="font-semibold grid gap-2 grid-cols-3">
            <span>From:</span>
            <span className="col-span-2">
              {values.schedule?.from?.toLocaleString() ?? 'N/A'}
            </span>
            <span>To:</span>
            <span className="col-span-2">
              {values.schedule?.to?.toLocaleString() ?? 'N/A'}
            </span>
          </p>
        </div>
        <h3 className="font-semibold mb-4">Questions:</h3>
        {values.tests.map((test, index) => (
          <Card key={test.id} className="p-4 mb-6">
            <div className="flex justify-between items-center">
              <strong>Question {index + 1}:</strong>
              <p>
                <strong>Points:</strong> {test.points}
              </p>
            </div>
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: test.question }}
            />
            <p className="text-muted-foreground">
              {test.type === 'single' ? 'Single Choice' : 'Multiple Choice'}
            </p>
            {renderAnswers(test, index)}
          </Card>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <StepperFooter
          currentStep={currentStep}
          stepsLength={steps.length}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      </CardFooter>
    </>
  );
}
