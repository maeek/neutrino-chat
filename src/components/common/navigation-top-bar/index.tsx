import { FC, memo } from 'react';
import { useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { Heading, Text } from '@maeek/neutrino-design/components/atoms/typography';
import { KeyboardArrowLeftRounded, KeyboardArrowRightRounded } from '@material-ui/icons';
import NavController from '../../../utils/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/root';
import './navigation-top-bar.scss';

export interface NavigationTopBarProps {
  [key: string]: any;
}

export const NavigationTopBar: FC<NavigationTopBarProps> = () => {
  const history = useHistory();
  const localHistory = useSelector((state: RootState) => state.history);

  const onHeadingClick = () => {
    // if (history.location.pathname !== '/') {
    NavController.forward(history, '/test');
    // }
  };

  const goBack = () => {
    console.log('Go back');
    NavController.back(history);
  };

  const goForward = () => {
    console.log('Go forward');
    NavController.forward(history);
  };

  const canGoBack = localHistory.currentIndex > 0 && localHistory.stack.length > 0;
  const canGoForward = localHistory.stack.length - 1 > localHistory.currentIndex;
  const navigationControlls = (
    <div className="navigation-top-bar-controlls">
      <KeyboardArrowLeftRounded
        onClick={goBack}
        className={classnames('navigation-top-bar-controlls-button', canGoBack && 'navigation-top-bar-controlls-button--active')}
      />
      <KeyboardArrowRightRounded
        onClick={goForward}
        className={classnames('navigation-top-bar-controlls-button', canGoForward && 'navigation-top-bar-controlls-button--active')}
      />
    </div>
  );

  return (
    <nav className="navigation-top-bar">
      {navigationControlls}
      <div className="navigation-top-bar-inner">
        <Heading level={1} className="navigation-top-bar-heading">
          <Text type="primary" onClick={onHeadingClick}>Neutrino Chat</Text>
        </Heading>
      </div>
    </nav>
  );
};

export default memo(NavigationTopBar) ;
