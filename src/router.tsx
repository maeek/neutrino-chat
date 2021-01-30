import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// import LoaderSelector from './components/loaderSelector';
// import RestrictedRouteWrapper from './pages/restrictedRoute';

// const Home = React.lazy(() => import('./pages/Home/'));
// const Profile = React.lazy(() => import('./pages/Profile/'));
// const LoginPage = React.lazy(() => import('./pages/Login/'));
// const RegisterPage = React.lazy(() => import('./pages/Register/'));
// const SettingsPage = React.lazy(() => import('pages/Settings/'));

const RouterWrapper: React.FC = () => (
  <Router>
    <Suspense fallback={null}>
    {/* <Suspense fallback={<LoaderSelector />}> */}
      <Switch>
        {/* <Route path="/login" component={LoginPage} />

        <Route path="/join" component={RegisterPage} />

        <RestrictedRouteWrapper>
          <Route
            path="/settings"
            component={SettingsPage}
          />
          <Route
            exact
            path="/profile"
            component={Profile}
          />
          <Route
            exact
            path="/"
            component={Home}
          />
        </RestrictedRouteWrapper> */}

      </Switch>
    </Suspense>
  </Router>
);

export default RouterWrapper;
