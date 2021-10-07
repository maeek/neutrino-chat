import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import NavigationControlls from '@/components/common/navigation-controlls/navigation';
import { ContextMenuWrapper } from './context-menu/context-menu-wrapper';
import NotificationsDrawer from './drawer/';
import { TopBarHeading } from './heading';
import './top-bar.scss';

export const TopBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <nav className="top-bar">
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
