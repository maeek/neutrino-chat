import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import NavigationControlls from '@/components/common/navigation-controlls/navigation';
import { ContextMenuWrapper } from './context-menu/context-menu-wrapper';
import NotificationsDrawer from './drawer/';
import { TopBarHeading } from './heading';
import './top-bar.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { isAppUITopBarHidden } from '@/selectors/app-ui';

export const TopBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isHidden = useSelector(isAppUITopBarHidden);

  return (
    <nav className={classNames('top-bar', !isHidden && 'top-bar--visible')}>
      <div className="top-bar-inner">
        <div className="top-bar-left">
          <NavigationControlls pwaOnly />
          <TopBarHeading />
        </div>
        <div className="top-bar-right">
          {!isMobile && <NotificationsDrawer />}
          <ContextMenuWrapper />
        </div>
      </div>
    </nav>
  );
};

export default memo(TopBar) ;
