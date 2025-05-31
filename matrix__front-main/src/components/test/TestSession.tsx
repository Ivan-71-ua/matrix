import { Loader } from 'lucide-react';

import QuestionContent from '@/components/test/question-content/QuestionContent';
import QuestionsHeader from '@/components/test/questions-header/QuestionsHeader';
import QuestionList from '@/components/test/questions-list/QuestionsList';
import NavigationButtons from '@/components/test/test-navigation-buttons/TestNavigationButtons';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useTestState } from '@/hooks/useTestState';
import { Test } from '@/types/test';

import Timer from '../app-timer/AppTimer';

type TestSessionProps = {
  test: Test;
};

export default function TestSession({ test }: TestSessionProps) {
  const {
    currentIndex,
    setCurrentIndex,
    handleAnswerSelect,
    handleNext,
    handlePrev,
    handleSubmit,
    currentQuestion,
    timeLeft,
    isPending,
  } = useTestState({
    test,
  });

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader className="w-16 h-16 mb-4 text-primary animate-spin " />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Sending your test...
        </h1>
        <p className="text-lg text-gray-600">
          Please wait while to see the results.
        </p>
      </div>
    );
  }

  return (
    <div className="flex p-6 flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{test.name}</h1>
        <Timer timeLeft={timeLeft} />
      </div>
      <div className="flex w-full gap-6">
        <Card className="flex-1">
          <CardHeader>
            <QuestionsHeader
              currentIndex={currentIndex}
              totalQuestions={test.questions.length}
              points={currentQuestion.points}
              question={test.questions[currentIndex].question}
            />
          </CardHeader>
          <CardContent>
            <QuestionContent
              currentQuestion={currentQuestion}
              handleAnswerSelect={handleAnswerSelect}
            />
          </CardContent>
          <CardFooter>
            <NavigationButtons
              currentIndex={currentIndex}
              totalQuestions={test.questions.length}
              handlePrev={handlePrev}
              handleNext={handleNext}
              handleSubmit={handleSubmit}
            />
          </CardFooter>
        </Card>
        <QuestionList
          test={test}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </div>
  );
}
