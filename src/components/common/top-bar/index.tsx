import { memo, MouseEventHandler, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory, useLocation } from 'react-router-dom';
import NavigationControlls from '@/components/common/navigation-controlls/navigation';
import { ContextMenuWrapper } from './context-menu/context-menu-wrapper';
import NotificationsDrawer from './drawer/';
import { TopBarHeading } from './heading';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  isAppUITopBarHidden,
  isAppUITopBarQuickNavHidden
} from '@/selectors/app-ui';
import { Text } from '@maeek/neutrino-design/components/typography/text';
import Navigator from '@/utils/navigation';
import './top-bar.scss';
import { setTopBarVisibility } from '@/store/app/ui/actions';

export const TopBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isHidden = useSelector(isAppUITopBarHidden);

  useEffect(() => {
    if (isMobile && location.pathname === '/me') {
      dispatch(setTopBarVisibility(true));
    }

    return () => {
      dispatch(setTopBarVisibility(false));
    };
  }, [isMobile, location.pathname]);

  return (
    <nav className={classNames('top-bar', !isHidden && 'top-bar--visible')}>
      <div className='top-bar-inner'>
        <div className='top-bar-left'>
          <NavigationControlls pwaOnly />
          <TopBarHeading />
        </div>
        <div className='top-bar-right'>
          {!isMobile && <NotificationsDrawer />}
          <ContextMenuWrapper />
        </div>
      </div>
    </nav>
  );
};

export default memo(TopBar);
