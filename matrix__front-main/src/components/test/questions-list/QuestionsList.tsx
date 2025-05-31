import React from 'react';

import Point from '@/components/point/Point';
import { Card, CardContent } from '@/components/ui/card';
import { cn, getAnswerStatus } from '@/lib/utils';
import { Test } from '@/types/test';

import { CorrectStatus } from '../types';

type QuestionListProps = {
  test: Test;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  isCompleted?: boolean;
  className?: string;
};

const QuestionList: React.FC<QuestionListProps> = ({
  test,
  currentIndex,
  setCurrentIndex,
  isCompleted = false,
  className,
}) => {
  const getPointClassName = (status: CorrectStatus) => {
    return cn('cursor-pointer', {
      'text-white border-0': isCompleted,
      'bg-green-400': status === 'correct' && isCompleted,
      'bg-red-400': status === 'incorrect' && isCompleted,
      'bg-yellow-400': status === 'neutral' && isCompleted,
    });
  };

  return (
    <div className={cn('w-1/4', className)}>
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold pt-3 mb-2">Questions</h2>
          <div className="w-full flex flex-wrap gap-2">
            {test.questions.map((question, index) => {
              return (
                <Point
                  key={question.id}
                  onClick={() => setCurrentIndex(index)}
                  isActive={currentIndex === index}
                  className={getPointClassName(
                    getAnswerStatus(test, question.id, isCompleted),
                  )}
                >
                  {index + 1}
                </Point>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionList;
