import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { useGetUser } from '@/hooks/useGetUser';
import PageWrapper from '@/layouts/PageWrapper';
import { formatDate } from '@/lib/utils';

export default function HomePage() {
  const { user } = useGetUser();

  const greeting = `Hello, ${user.username}!`;
  const dateMessage = ` ${formatDate(Date.now())}`;

  return (
    <PageWrapper>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">{greeting}</h1>
        <div className="text-xl font-semibold">
          <div className="flex">
            <Calendar className="mr-2" />
            Today
          </div>
          <span className="text-primary">{dateMessage}</span>
        </div>
      </div>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your platform for high-quality
          <span className="text-primary"> educational tests</span>
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Welcome to Tests website. Every test on our platform is verified by
          our team to ensure the highest quality standards.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link to="/tests" className={buttonVariants()}>
            Browse Tests
          </Link>
          {user.role === 'teacher' && (
            <Link
              to="/create-test"
              className={buttonVariants({ variant: 'outline' })}
            >
              Create your own test
            </Link>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
