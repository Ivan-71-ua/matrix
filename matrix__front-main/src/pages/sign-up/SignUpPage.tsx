import { Navigate } from 'react-router-dom';

import SignUpForm from '@/components/forms/SignUpForm';
import { useAuthContext } from '@/providers/AuthProvider';

export default function SignUpPage() {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="max-w-sm mx-auto">
      <SignUpForm />
    </div>
  );
}
