import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routes } from '../../router/routes'

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  return isSignedIn ? <Component {...rest} /> : <Navigate to={routes.loginRoute} />;
};

export default PrivateRoute;
