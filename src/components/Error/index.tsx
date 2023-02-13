import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError() as Response;
  return (
    <h2>
      {error?.status ?? ''}
      {error?.statusText ?? 'Something went wrong'}
    </h2>
  );
};

export default Error;
