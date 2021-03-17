import { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import RestrictedRoute from './components/common/restricted-routes';

import LoginPage from './modules/auth/Login';
import JoinPage from './modules/auth/Join';
import MainPage from './modules/main/Main';
import TopBar from './components/common/top-bar';
import Navigator from './utils/navigation';

const RouterWrapper: FC<{}> = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/join" component={JoinPage} />
      <RestrictedRoute>
        <TopBar />
        <Route exact path="/" component={MainPage} />

        <Route exact path="/test" render={({history}) => <div>
          <button onClick={() => Navigator.forward(history, '/test2')}>Go somewhere else</button>
        </div>} />
        <Route exact path="/test2" render={({history}) => <div>
          <button onClick={() => Navigator.forward(history, '/')}>Go home</button>
        </div>} />

      </RestrictedRoute>
    </Switch>
  </Router>
);



export default RouterWrapper;
