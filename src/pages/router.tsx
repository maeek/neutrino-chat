import { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import RestrictedRoute from './restricted-routes';
import NotAuthorizedRoutes from './not-authorized-routes';

import LoginPage from './auth/Login';
import JoinPage from './auth/Join';

const RouterWrapper: FC<{}> = () => (
  <Router>
    <Switch>
      <NotAuthorizedRoutes>
        <Route exact path="/" render={() => <Redirect to="/login" />} />

        <Route path="/login" component={LoginPage} />
        <Route path="/join" render={JoinPage} />
      </NotAuthorizedRoutes>
      <RestrictedRoute>
        <Route path="/test" render={() => <div>Restricted</div>} />
      </RestrictedRoute>
    </Switch>
  </Router>
);



export default RouterWrapper;
