import { Navigate } from 'react-router-dom';

import SignInForm from '@/components/forms/SignInForm';
import { useAuthContext } from '@/providers/AuthProvider';

export default function SignInPage() {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="max-w-sm  mx-auto">
      <SignInForm />
    </div>
  );
}
