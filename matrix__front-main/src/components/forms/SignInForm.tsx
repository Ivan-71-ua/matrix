import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardList } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignIn } from '@/hooks/useAuth';
import {
  SignInCredentialsValidator,
  TSignInCredentialsValidator,
} from '@/lib/validationSchemes';

export default function SignInForm() {
  const { mutate: handleSignIn, isPending } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInCredentialsValidator>({
    resolver: zodResolver(SignInCredentialsValidator),
  });

  const onSubmit = async ({ email, password }: TSignInCredentialsValidator) => {
    await handleSignIn({ email, password });
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
              Don&apos;t have an account?{' '}
              <Link to="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="username"
                placeholder="Username"
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
                placeholder="Your password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Signing in...' : 'Login'}
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
