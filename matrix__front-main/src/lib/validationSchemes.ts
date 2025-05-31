import { z } from 'zod';

export const SignUpCredentialsValidator = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  role: z.enum(['student', 'teacher']),
});

export type TSignInCredentialsValidator = z.infer<
  typeof SignInCredentialsValidator
>;

export const SignInCredentialsValidator = z.object({
  email: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type TSignUpCredentialsValidator = z.infer<
  typeof SignUpCredentialsValidator
>;

export const configureTestSchema = z.object({
  testName: z.string().min(1, 'Test name is required'),
  testDuration: z
    .object({
      hours: z.number().min(0, 'Hours must be at least 0'),
      minutes: z.number().min(0, 'Minutes must be at least 0'),
    })
    .refine((data) => data.hours * 60 + data.minutes >= 3, {
      message: 'The test duration must be at least 3 minutes',
      path: ['minutes'],
    }),
  schedule: z
    .object({
      from: z.date().nullable(),
      to: z.date().nullable(),
    })
    .nullable(),
  tests: z
    .array(
      z.object({
        question: z.string().min(1, 'Question is required'),
        answers: z
          .array(
            z.object({
              answer: z.string().min(1, 'Answer is required'),
              isCorrect: z.boolean(),
              id: z.string().uuid(),
            }),
          )
          .min(2, 'Question must have at least 2 answers')
          .refine((answers) => answers.some((answer) => answer.isCorrect), {
            message: 'At least one answer must be correct',
          }),
        points: z.number().min(1, 'Points must be at least 1'),
        type: z.enum(['single', 'multiple']),
        id: z.string().uuid({ message: 'Invalid question id' }),
        index: z.number().min(0, { message: 'Invalid question index' }),
      }),
    )
    .min(1, 'Test must have at least 1 question'),
});
export type ConfigureTestFormValues = z.infer<typeof configureTestSchema>;
