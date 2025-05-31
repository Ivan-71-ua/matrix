import React, { useEffect } from 'react';

import { Plus, Trash2 } from 'lucide-react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';

import ErrorMessage from '@/components/error-message/ErrorMessage';
import RichEditor from '@/components/rich-editor/RichEditor';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { QuestionType } from '@/types/test';

import StepperFooter from '../../stepper-footer/SteperFooter';
import { ConfigureTestFormValues, StepItemProps } from '../../types';

type CreateTestsProps = StepItemProps;

const CreateTests: React.FC<CreateTestsProps> = ({
  currentStep,
  handleNext,
  handleBack,
  steps,
}) => {
  const {
    control,
    setValue,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<ConfigureTestFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: 'tests' });

  const handleNextStep = async () => {
    const isValid = await trigger(['tests']);
    if (isValid) {
      handleNext();
    } else {
      toast.error('Tests are not valid. Please fill out all required fields.');
    }
  };

  const handleAddQuestion = () => {
    append({
      index: fields.length,
      answers: [],
      id: crypto.randomUUID(),
      question: '',
      type: 'single',
      points: 1,
    });
  };

  useEffect(() => {
    if (fields.length === 0) {
      handleAddQuestion();
    }
  }, []);

  const handleAddAnswer = (index: number) => {
    const currentAnswers = getValues(`tests.${index}.answers`) || [];
    setValue(`tests.${index}.answers`, [
      ...currentAnswers,
      { answer: '', isCorrect: false, id: crypto.randomUUID() },
    ]);
  };

  const handleQuestionTypeChange = (
    questionIndex: number,
    newType: QuestionType,
  ) => {
    const currentAnswers = getValues(`tests.${questionIndex}.answers`) || [];
    const updatedAnswers =
      newType === 'single'
        ? currentAnswers.map((answer) => ({ ...answer, isCorrect: false }))
        : currentAnswers;
    setValue(`tests.${questionIndex}.answers`, updatedAnswers);
    setValue(`tests.${questionIndex}.type`, newType);
  };

  const handleCorrectAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    isCorrect: boolean,
  ) => {
    const currentAnswers = getValues(`tests.${questionIndex}.answers`) || [];
    const questionType = watch(`tests.${questionIndex}.type`);

    const updatedAnswers = currentAnswers.map((answer, idx) => ({
      ...answer,
      isCorrect:
        questionType === 'single'
          ? idx === answerIndex && isCorrect
          : idx === answerIndex
            ? isCorrect
            : answer.isCorrect,
    }));

    setValue(`tests.${questionIndex}.answers`, updatedAnswers);
  };

  return (
    <>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Button onClick={handleAddQuestion}>Add Question</Button>
          {errors.tests?.message && (
            <ErrorMessage message={errors.tests.message} />
          )}
          <span className="font-medium text-lg">
            Total Questions: {fields.length}
          </span>
        </div>

        {fields.map((field, questionIndex) => (
          <React.Fragment key={field.id}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold">
                    Question: {questionIndex + 1}
                  </p>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(questionIndex)}
                  >
                    <Trash2 size={24} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-5">
                  <div>
                    <Label className="mb-1 block">Question Type:</Label>
                    <Controller
                      control={control}
                      name={`tests.${questionIndex}.type`}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) =>
                            handleQuestionTypeChange(
                              questionIndex,
                              value as QuestionType,
                            )
                          }
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Single" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple">Multiple</SelectItem>
                            <SelectItem value="single">Single</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block">Points:</Label>
                    <Controller
                      control={control}
                      name={`tests.${questionIndex}.points`}
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Enter points"
                          className="w-20 text-center"
                          min={1}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      )}
                    />
                  </div>
                </div>
                <Controller
                  control={control}
                  name={`tests.${questionIndex}.question`}
                  render={({ field, fieldState }) => (
                    <>
                      {fieldState.error && (
                        <ErrorMessage message={fieldState.error.message} />
                      )}
                      <RichEditor {...field} />
                    </>
                  )}
                />
                <div className="mt-8">
                  <div className="flex items-end justify-between">
                    <p className="font-semibold">Answers:</p>
                    {errors.tests?.[questionIndex]?.answers && (
                      <ErrorMessage message="Please add at least 2 answers and one correct" />
                    )}
                    <Button
                      type="button"
                      size="icon"
                      onClick={() => handleAddAnswer(questionIndex)}
                    >
                      <Plus size={24} />
                    </Button>
                  </div>
                  <Controller
                    control={control}
                    name={`tests.${questionIndex}.answers`}
                    render={({ field }) => (
                      <>
                        {field.value.map((answer, answerIndex) => (
                          <div
                            key={answerIndex}
                            className="flex items-center space-x-2 mt-4"
                          >
                            <Checkbox
                              checked={answer.isCorrect}
                              onCheckedChange={(value: boolean) =>
                                handleCorrectAnswerChange(
                                  questionIndex,
                                  answerIndex,
                                  value,
                                )
                              }
                            />
                            <Input
                              placeholder="Write answer here"
                              value={answer.answer}
                              onChange={(e) => {
                                const newAnswers = [...field.value];
                                newAnswers[answerIndex].answer = e.target.value;
                                field.onChange(newAnswers);
                              }}
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => {
                                const newAnswers = [...field.value];
                                newAnswers.splice(answerIndex, 1);
                                field.onChange(newAnswers);
                              }}
                            >
                              <Trash2 size={24} />
                            </Button>
                          </div>
                        ))}
                      </>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Separator className="my-10" />
          </React.Fragment>
        ))}
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

export default CreateTests;
