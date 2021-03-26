import { FC, useState, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import ContextMenu, { ContextMenuItems } from '@maeek/neutrino-design/components/molecules/context-menu/Menu';
import { AccountCircleRounded, ExitToAppRounded, HelpOutlineRounded, NotificationsOffRounded, SettingsRounded } from '@material-ui/icons';
import AvatarWrapper from '../avatar-wrapper';
import { clearTokens } from '@store/session/actions';
import ContextMenuPrefix from './context-menu-prefix';
import '../styles/top-bar.scss';

export interface ContextMenuWrapperProps {
  [key: string]: any;
}

export const ContextMenuWrapper: FC<ContextMenuWrapperProps> = (props) => {
  const [showContext, setShowContext] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = useCallback(() => setShowContext(!showContext), [setShowContext, showContext]);
  const closeContextMenu = useCallback(() => setShowContext(false), [setShowContext]);

  const items: ContextMenuItems[] = [
    {
      index: 0,
      text: 'Profile',
      icon: <AccountCircleRounded />,
      closeOnClick: true
    },
    {
      index: 1,
      text: 'Notifications',
      icon: <NotificationsOffRounded />,
      className: 'top-bar-context-menu-notifications'
    },
    {
      index: 2,
      text: 'Settings',
      icon: <SettingsRounded />,
      closeOnClick: true
    },
    {
      index: 3,
      text: 'Help',
      icon: <HelpOutlineRounded />,
      closeOnClick: true
    },
    {
      index: 4,
      text: 'Log out',
      icon: <ExitToAppRounded />,
      closeOnClick: true,
      onClick: () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('refreshToken');
        window.sessionStorage.removeItem('history');
        dispatch(clearTokens());
      }
    }
  ];

  const contextMenu =  
    (
      <ContextMenu items={items} className={showContext ? '' : 'hidden'} closeContextMenu={closeContextMenu}>
        <div className="top-bar-badge-wrapper-context-menu-prefix">
          <AvatarWrapper size="large" />
          <ContextMenuPrefix />
        </div>
      </ContextMenu>
    );

  return (
    <div className="top-bar-badge-wrapper" {...props}>
      <AvatarWrapper size="medium" onClick={toggleMenu} />
      {contextMenu}
    </div>
  );
};

export default memo(ContextMenuWrapper);
