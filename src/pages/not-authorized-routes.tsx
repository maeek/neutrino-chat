import { connect } from 'react-redux';
import { FC, ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from '../store/root';
import { getAuthToken, getAuthRefreshToken } from '../store/session/selectors';

interface NotAuthorizedRoutesProps {
  isAuthenticated?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

const NotAuthorizedRoutes: FC<NotAuthorizedRoutesProps> = ({ isAuthenticated, children, ...rest }) => (
  <Route
    {...rest}
    render={
      () => (!isAuthenticated
        ? children
        : (
          <Redirect
            exact
            to="/"
          />
        ))
    }
  />
);

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: Boolean(getAuthToken(state)) && Boolean(getAuthRefreshToken(state))
});

export default connect(mapStateToProps)(NotAuthorizedRoutes);
