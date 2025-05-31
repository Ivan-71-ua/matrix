import { Navigate, useParams } from 'react-router-dom';

import AppLoader from '@/components/app-loader/AppLoader';
import TestSession from '@/components/test/TestSession';
import useErrorPageRedirect from '@/hooks/useErrorPageRedirect';
import { useGetUser } from '@/hooks/useGetUser';
import { useGetTestById } from '@/hooks/useTests';
import PageWrapper from '@/layouts/PageWrapper';

export default function TestPage() {
  const { testId } = useParams<{ testId: string }>();
  const { renderRedirectComponent } = useErrorPageRedirect();
  const { data: test, isLoading, isError } = useGetTestById(testId || '');
  const { user } = useGetUser();

  if (isLoading) {
    return <AppLoader />;
  }

  if (isError || !test) {
    return renderRedirectComponent({ errorType: 'notFound' });
  }
  const isCompleted = test?.studentsCompleted?.includes(user.uid);

  if (isCompleted) return <Navigate to={`/test-result/${testId}`} />;

  return (
    <PageWrapper>
      <TestSession test={test} />
    </PageWrapper>
  );
}
