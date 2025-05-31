import React from 'react';

import AppTooltip from '@/components/app-tooltip/AppTooltip';
import Point from '@/components/point/Point';
import { cn } from '@/lib/utils';

type QuestionsHeaderProps = {
  currentIndex: number;
  totalQuestions: number;
  points: number;
  question: string;
  isCorrect?: boolean;
  questionScore?: number;
};

const QuestionsHeader: React.FC<QuestionsHeaderProps> = ({
  currentIndex,
  totalQuestions,
  points,
  question,
  isCorrect,
  questionScore,
}) => {
  const point =
    questionScore !== undefined && questionScore >= 0
      ? `${questionScore} / ${points}`
      : points;
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-2xl">
            Question {currentIndex + 1} of {totalQuestions}
          </h2>
        </div>
        <AppTooltip tooltipMessage="Points awarded for this question">
          <Point
            className={cn({
              'w-18': questionScore,
            })}
            isActive={isCorrect}
          >
            {point}
          </Point>
        </AppTooltip>
      </div>
      <div className="text-lg" dangerouslySetInnerHTML={{ __html: question }} />
    </>
  );
};

export default QuestionsHeader;
