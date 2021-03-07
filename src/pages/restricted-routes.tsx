import { connect } from 'react-redux';
import { FC, ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from '../store/root';
import { getAuthToken, getAuthRefreshToken } from '../store/session/selectors';

interface RestrictedRouteProps {
  isAuthenticated?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({ isAuthenticated, children, ...rest }) => (
  <Route
    {...rest}
    render={
      ({ location }) => (isAuthenticated
        ? children
        : (
          <Redirect
            exact
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        ))
    }
  />
);

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: Boolean(getAuthToken(state)) && Boolean(getAuthRefreshToken(state))
});

export default connect(mapStateToProps)(RestrictedRoute);
