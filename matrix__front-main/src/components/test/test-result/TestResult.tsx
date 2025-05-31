import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { calculateTotalScore, calculateQuestionScore } from '@/lib/utils';
import { Test, TestQuestion } from '@/types/test';

import QuestionContent from '../question-content/QuestionContent';
import QuestionsHeader from '../questions-header/QuestionsHeader';
import QuestionList from '../questions-list/QuestionsList';

type TestResultProps = {
  test: Test;
};

const renderCorrectAnswers = (question: TestQuestion) => (
  <div className="mt-2">
    <p className="text-xs bg-orange-300 text-orange-800 rounded-md py-1 px-2 mt-4 ">
      Correct answer:{' '}
      {question.answers
        .filter((a) => a.isCorrect)
        .map((a) => a.answer)
        .join(', ')}
    </p>
  </div>
);

export default function TestResult({ test }: TestResultProps) {
  const totalScore = calculateTotalScore(test);

  return (
    <div className="flex w-full gap-6">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">{test.name} results</h1>
            <p className="text-muted-foreground">
              created by <span className="text-primary">{test.createdByName}</span>
            </p>
          </div>
          <p className="text-lg font-semibold ">
            Total Score: <span className="text-primary">{totalScore}</span>
          </p>
        </div>
        {test.questions.map((question, index) => (
          <Card key={question.id} className="mb-6">
            <CardHeader>
              <QuestionsHeader
                currentIndex={index}
                totalQuestions={test.questions.length}
                points={question.points}
                question={question.question}
                questionScore={calculateQuestionScore(question)}
              />
            </CardHeader>
            <CardContent>
              <QuestionContent
                currentQuestion={question}
                handleAnswerSelect={() => {}}
                isCompleted
              />
              {renderCorrectAnswers(question)}
            </CardContent>
          </Card>
        ))}
      </div>
      <QuestionList
        className="mt-[47px]"
        test={test}
        currentIndex={-1}
        setCurrentIndex={() => {}}
        isCompleted
      />
    </div>
  );
}
