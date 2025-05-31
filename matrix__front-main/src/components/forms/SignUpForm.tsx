import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardList } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignUp } from '@/hooks/useAuth';
import {
  SignUpCredentialsValidator,
  TSignUpCredentialsValidator,
} from '@/lib/validationSchemes';
import { TRole } from '@/types/auth';

import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

export default function SignUpForm() {
  const { mutate: handleSignUp, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TSignUpCredentialsValidator>({
    resolver: zodResolver(SignUpCredentialsValidator),
    defaultValues: {
      role: 'student',
    },
  });

  const onSubmit = async ({
    username,
    email,
    password,
    role,
  }: TSignUpCredentialsValidator) => {
    await handleSignUp({ username, email, password, role });
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <ClipboardList className="size-6" />
              </div>
              <span className="sr-only">Mathtrix</span>
            </div>
            <h1 className="text-xl font-bold">Welcome to Mathtrix!</h1>
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Tabs
              defaultValue="student"
              onValueChange={(value) => setValue('role', value as TRole)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student" className="cursor-pointer">
                  Student
                </TabsTrigger>
                <TabsTrigger value="teacher" className="cursor-pointer">
                  Teacher
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Signing up...' : 'Sign Up'}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{' '}
        <span className="underline underline-offset-2 hover:text-primary">
          Terms of Service
        </span>{' '}
        and{' '}
        <span className="underline underline-offset-2 hover:text-primary">
          Privacy Policy
        </span>
        .
      </div>
    </div>
  );
}
