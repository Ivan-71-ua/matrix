type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <span className="text-red-500">{message ?? 'invalid data'}</span>;
};

export default ErrorMessage;
