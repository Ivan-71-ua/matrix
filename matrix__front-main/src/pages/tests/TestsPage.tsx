import { TestTable } from '@/components/tables/test-table/TestTable';
import { useGetUser } from '@/hooks/useGetUser';
import { useGetTestsByRole } from '@/hooks/useTests';
import PageWrapper from '@/layouts/PageWrapper';

export default function TestsPage() {
  const { user } = useGetUser();

  const { data: tests } = useGetTestsByRole({
    userId: user.uid,
    role: user.role,
  });

  return (
    <PageWrapper pageTitle="Tests">
      <TestTable userRole={user.role} tests={tests ?? []} />
    </PageWrapper>
  );
}
