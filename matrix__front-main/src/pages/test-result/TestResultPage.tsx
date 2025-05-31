import { useParams } from 'react-router-dom';

import AppLoader from '@/components/app-loader/AppLoader';
import TestResult from '@/components/test/test-result/TestResult';
import useErrorPageRedirect from '@/hooks/useErrorPageRedirect';
import { useGetTestResults } from '@/hooks/useTests';
import PageWrapper from '@/layouts/PageWrapper';

export default function TestResultPage() {
  const { testId } = useParams<{ testId: string }>();
  const { renderRedirectComponent } = useErrorPageRedirect();

  const {
    data: testResult,
    isLoading: isLoadingResult,
    isError,
  } = useGetTestResults({
    testId: testId || '',
  });

  if (isLoadingResult) {
    return <AppLoader />;
  }

  if (isError || !testResult) {
    return renderRedirectComponent({ errorType: 'notFound' });
  }

  return (
    <PageWrapper>
      <TestResult test={testResult} />
    </PageWrapper>
  );
}
