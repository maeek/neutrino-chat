import { useSelector } from 'react-redux';
import { FC, ReactNode } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { RootState } from '../../store/root';
import { getAuthToken, getAuthRefreshToken } from '../../store/session/selectors';
import Navigator from '../../utils/navigation';

interface RestrictedRouteProps {
  children?: ReactNode;
  [key: string]: any;
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({ children, ...rest }) => {
  const isAuthenticated = useSelector((state: RootState) => !!getAuthToken(state) && !!getAuthRefreshToken(state));
  const history = useHistory();
  const location = useLocation();

  if (!isAuthenticated) {
    console.warn('You\'re not authenticated, redirecting to /login from...', location);
    Navigator.replace(history, '/login', {
      from: {
        pathname: location.pathname
      }
    });
  }

  return <>{isAuthenticated ? children : <></>}</>;
};

export default RestrictedRoute;
