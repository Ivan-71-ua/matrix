import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl  mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className={cn(buttonVariants())}>
        Go to Home
      </Link>
    </div>
  );
}
