import { createBrowserRouter, RouteObject } from 'react-router-dom';

import App from '@/App';
import ProtectedRoute from '@/layouts/ProtectedRoute';
import CreateTestPage from '@/pages/create-test/CreateTestPage';
import HomePage from '@/pages/home/HomePage';
import NotFoundPage from '@/pages/not-found/NotFoundPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import SignIn from '@/pages/sign-in/SignInPage';
import SignUp from '@/pages/sign-up/SignUpPage';
import TestPage from '@/pages/test/TestPage';
import TestResultPage from '@/pages/test-result/TestResultPage';
import TestsPage from '@/pages/tests/TestsPage';

const guestRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: '/sign-in',
  },
  {
    element: <SignUp />,
    path: '/sign-up',
  },
  {
    element: <NotFoundPage />,
    path: '*',
  },
];

const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute element={<HomePage />} />,
    path: '/',
  },
  {
    element: <ProtectedRoute element={<TestsPage />} />,
    path: '/tests',
  },
  {
    element: <ProtectedRoute element={<ProfilePage />} />,
    path: '/profile',
  },
  {
    element: <ProtectedRoute element={<CreateTestPage />} />,
    path: '/create-test',
  },
  {
    element: <ProtectedRoute element={<TestPage />} />,
    path: '/test/:testId',
  },
  {
    element: <ProtectedRoute element={<TestResultPage />} />,
    path: '/test-result/:testId',
  },
];

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [...protectedRoutes, ...guestRoutes],
  },
];

export const router = createBrowserRouter(routes);
