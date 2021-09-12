import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import RestrictedRoute from '@/components/common/restricted-routes';

import LoginPage from '@/views/auth/Login';
import JoinPage from '@/views/auth/Join';

import MainPage from '@/views/main/Main';
import ProfilePage from '@/views/me/Profile';
import UserPage from '@/views/user/User';

import TopBar from '@/components/common/top-bar';
import { MobileBottomNav } from '@/components/common/mobile-bottom-nav';

const RouterWrapper = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/join" component={JoinPage} />
      <RestrictedRoute>
        <TopBar />

        <Route exact path="/" component={MainPage} />
        <Route exact path="/me" component={ProfilePage} />
        <Route exact path="/chats" render={() => <main className="page-root" />} />
        <Route exact path="/u/:username" render={UserPage} />

        <MobileBottomNav />
      </RestrictedRoute>
    </Switch>
  </Router>
);

export default RouterWrapper;
