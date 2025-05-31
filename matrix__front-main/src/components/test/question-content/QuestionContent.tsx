import React from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { TestQuestion } from '@/types/test';

type QuestionContentProps = {
  currentQuestion: TestQuestion;
  handleAnswerSelect: (
    questionId: string,
    answerId: string,
    isChecked?: boolean,
  ) => void;
  isCompleted?: boolean;
};

const QuestionContent: React.FC<QuestionContentProps> = ({
  currentQuestion,
  handleAnswerSelect,
  isCompleted = false,
}) => {
  const { id: questionId, type, answers } = currentQuestion;

  const renderSingleChoice = () => (
    <RadioGroup
      value={answers.find((answer) => answer.isChosen)?.id || ''}
      onValueChange={(value) =>
        !isCompleted && handleAnswerSelect(questionId, value)
      }
    >
      {answers.map((answer) => (
        <div
          key={answer.id}
          className={cn('flex items-center gap-2 p-1 rounded-md', {
            'bg-green-100': isCompleted && answer.isChosen && answer.isCorrect,
            'bg-red-100': isCompleted && answer.isChosen && !answer.isCorrect,
          })}
        >
          <RadioGroupItem
            value={answer.id}
            id={answer.id}
            disabled={isCompleted}
          />
          <Label htmlFor={answer.id}>{answer.answer}</Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderMultipleChoice = () => (
    <div className="space-y-2">
      {answers.map((answer) => (
        <div
          key={answer.id}
          className={cn('flex items-center gap-2 p-1 rounded-md', {
            'bg-green-100 ': isCompleted && answer.isChosen && answer.isCorrect,
            'bg-red-100': isCompleted && answer.isChosen && !answer.isCorrect,
          })}
        >
          <Checkbox
            checked={answer.isChosen}
            onCheckedChange={(checked) =>
              !isCompleted &&
              handleAnswerSelect(questionId, answer.id, checked as boolean)
            }
            disabled={isCompleted}
          />
          <Label>{answer.answer}</Label>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <p className="text-sm text-muted-foreground">
        {type === 'single'
          ? 'Select one answer:'
          : 'Select one or more answers:'}
      </p>
      <div className="mt-2 space-y-2">
        {type === 'single' ? renderSingleChoice() : renderMultipleChoice()}
      </div>
    </>
  );
};

export default QuestionContent;
