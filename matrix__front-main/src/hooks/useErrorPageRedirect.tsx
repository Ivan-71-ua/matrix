import {
  Location,
  Navigate,
  NavigateProps,
  useLocation,
  useNavigate,
} from 'react-router-dom';

type ErrorPageState = {
  goBackPath?: string;
  goBackButtonTranslationKey?: string;
  errorMessageTranslationKey?: string;
};

type ErrorType = 'notFound' | 'unknown';

type RedirectConfig = Partial<{ errorType: ErrorType } & ErrorPageState>;

const errorPages: Record<ErrorType, string> = {
  notFound: '/404',
  unknown: '/error',
};

const createRedirectConfig = ({
  errorType,
  ...state
}: RedirectConfig = {}): NavigateProps => {
  return {
    to: errorPages[errorType ?? 'notFound'],
    state,
    replace: true,
  } as const;
};

const useErrorPageRedirect = () => {
  const navigate = useNavigate();
  const { state }: Location<ErrorPageState | null> = useLocation();

  const redirect = (config?: RedirectConfig) => {
    const { to, ...navigateConfig } = createRedirectConfig(config);
    navigate(to, navigateConfig);
  };

  const renderRedirectComponent = (config?: RedirectConfig) => {
    return <Navigate {...createRedirectConfig(config)} />;
  };

  return { state, redirect, renderRedirectComponent } as const;
};

export default useErrorPageRedirect;
