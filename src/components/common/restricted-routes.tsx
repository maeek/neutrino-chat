import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/root';
import { getAuthToken, getAuthRefreshToken } from '@/selectors/session';
import Navigator from '@/utils/navigation';
import { getMeUser } from '@/selectors/user';
import { fetchMeBasicInfo } from '@/actions/me';

interface RestrictedRouteProps {
  children?: ReactNode;
}

const RestrictedRoute = ({ children }: RestrictedRouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => !!getAuthToken(state) && !!getAuthRefreshToken(state)
  );
  const [fetched, setFetched] = useState<'idle' | 'fetching' | 'done'>('idle');
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      console.warn(
        "You're not authenticated, redirecting to /login from...",
        location
      );

      Navigator.replace(history, '/login', {
        from: { pathname: location.pathname }
      });
    }
  }, [history, isAuthenticated, location]);

  useEffect(() => {
    if (fetched === 'idle') {
      setFetched('fetching');
      (async () => {
        await dispatch(fetchMeBasicInfo());
        setFetched('done');
      })();
    }
  }, [isAuthenticated, dispatch, fetched]);

  return <>{children}</>;
};

export default RestrictedRoute;
