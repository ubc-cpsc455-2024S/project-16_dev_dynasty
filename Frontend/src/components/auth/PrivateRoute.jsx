import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routes } from '../../router/routes'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ element: Component, requiredRole, ...rest }) => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const currentUser = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  if (!isSignedIn) {
    navigate(routes.loginRoute);
  }

  if (requiredRole && currentUser?.role !== requiredRole) {
    navigate(routes.loginRoute);
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
