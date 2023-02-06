import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const location = useLocation();
  return location.state ? null : <h2>Ooooops!</h2>;
};

export default ErrorPage;
