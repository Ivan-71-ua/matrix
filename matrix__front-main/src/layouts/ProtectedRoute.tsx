import { JSX } from 'react';

import { Navigate } from 'react-router-dom';

import AppLoader from '@/components/app-loader/AppLoader';

import { useAuthContext } from '../providers/AuthProvider';

type ProtectedRouteProps = {
  element: JSX.Element;
  unauthorizedRedirectPath?: string;
};

const ProtectedRoute = ({
  element,
  unauthorizedRedirectPath = '/sign-in',
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <AppLoader />;
  }

  if (!user) {
    return <Navigate to={unauthorizedRedirectPath} />;
  }

  return element;
};

export default ProtectedRoute;
