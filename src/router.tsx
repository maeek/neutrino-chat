import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RestrictedRoute from '@/components/common/restricted-routes';
import LoginPage from '@/views/auth/Login';
import JoinPage from '@/views/auth/Join';
import MainPage from '@/views/main/Main';
import ChatsPage from '@/views/chats/Chats';
import ProfilePage from '@/views/me/Profile';
import UserPage from '@/views/user/User';
import TopBar from '@/components/common/top-bar';
import { MobileBottomNav } from '@/components/common/mobile-bottom-nav';
import SettingsPage from './views/settings/Settings';
import SettingsProfilePage from './views/settings/content/Profile';
import SettingsSecurityPage from './views/settings/content/Security';
import SettingsChatsPage from './views/settings/content/Chats';
import SettingsNotificationsPage from './views/settings/content/Notifications';
import SettingsAppearancePage from './views/settings/content/Appearance';

const RouterWrapper = () => (
  <Router>
    <Switch>
      <Route path='/login' component={LoginPage} />
      <Route exact path='/join' component={JoinPage} />
      <RestrictedRoute>
        <TopBar />

        <Route exact path='/' component={ChatsPage} />
        <Route exact path='/browse' component={MainPage} />
        <Route path='/settings'>
          <SettingsPage>
            <Route path='/settings/profile' component={SettingsProfilePage} />
            <Route path='/settings/security' component={SettingsSecurityPage} />
            <Route path='/settings/chats' component={SettingsChatsPage} />
            <Route
              path='/settings/notifications'
              component={SettingsNotificationsPage}
            />
            <Route
              path='/settings/appearance'
              component={SettingsAppearancePage}
            />
          </SettingsPage>
        </Route>
        <Route exact path='/me' component={ProfilePage} />
        <Route
          exact
          path='/chats'
          render={() => <main className='page-root' />}
        />
        <Route exact path='/u/:username' render={UserPage} />
        <Route exact path='/u/:username/chat' render={UserPage} />

        <MobileBottomNav />
      </RestrictedRoute>
    </Switch>
  </Router>
);

export default RouterWrapper;
