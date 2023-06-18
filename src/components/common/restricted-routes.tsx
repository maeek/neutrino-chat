import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/root';
import { getAuthToken, getAuthRefreshToken } from '@/selectors/session';
import Navigator from '@/utils/navigation';
import { fetchMeBasicInfo } from '@/actions/me';
import { logout } from '@/actions/auth';
import { SocketProvider } from '../socket-context/context';

interface RestrictedRouteProps {
  children?: ReactNode;
}

const RestrictedRoute = ({ children }: RestrictedRouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => !!getAuthToken(state) && !!getAuthRefreshToken(state)
  );
  const [ fetched, setFetched ] = useState<'idle' | 'fetching' | 'done'>('idle');
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const errors = useSelector((state: RootState) => state.app.errors.list);

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      console.warn(
        'You\'re not authenticated, redirecting to /login from...',
        location
      );

      Navigator.replace(history, '/login', {
        from: { pathname: location.pathname }
      });
    }
  }, [ history, isAuthenticated, location ]);

  useEffect(() => {
    if (fetched === 'idle') {
      setFetched('fetching');
      (async () => {
        try {
          await dispatch(fetchMeBasicInfo());
        } catch (err) {
          // noting to do here
        } finally {
          setFetched('done');
        }
      })();
    }
  }, [ isAuthenticated, dispatch, fetched ]);

  useEffect(() => {
    if (errors.filter((e) => e.shouldLogout).length > 0) {
      dispatch(logout());
    }
  }, [ errors, dispatch ]);

  return <SocketProvider>{children}</SocketProvider>;
};

export default RestrictedRoute;
