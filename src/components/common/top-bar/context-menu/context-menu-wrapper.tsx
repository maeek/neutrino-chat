import { useState, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ContextMenu, {
  ContextMenuItems
} from '@maeek/neutrino-design/components/context-menu/Menu';
import {
  AccountCircleRounded,
  ExitToAppRounded,
  HelpOutlineRounded,
  SettingsRounded
} from '@material-ui/icons';
import Navigator from '@/utils/navigation';
import { logout } from '@/actions/auth';
import AvatarWrapper from '../avatar-wrapper';
import ContextMenuPrefix from './context-menu-prefix';
import './context-menu-wrapper.scss';

export const ContextMenuWrapper = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [showContext, setShowContext] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const navigate = useCallback(
    (link: string) => () => {
      Navigator.forward(history, link);
    },
    [history]
  );

  const toggleMenu = useCallback(() => {
    if (isMobile) {
      Navigator.forward(history, '/me');
    } else {
      setShowContext(!showContext);
    }
  }, [isMobile, history, showContext]);

  const closeContextMenu = useCallback(
    () => setShowContext(false),
    [setShowContext]
  );

  const items: ContextMenuItems[] = [
    {
      text: 'Profile',
      icon: <AccountCircleRounded />,
      closeOnClick: true,
      onClick: navigate('/me')
    },
    {
      text: 'Settings',
      icon: <SettingsRounded />,
      closeOnClick: true,
      onClick: navigate('/settings/profile')
    },
    {
      text: 'Log out',
      icon: <ExitToAppRounded />,
      closeOnClick: true,
      onClick: () => {
        dispatch(logout());
      }
    }
  ];

  const contextMenu = (
    <ContextMenu
      items={items}
      className={showContext ? '' : 'context-menu--hidden'}
      closeContextMenu={closeContextMenu}
    >
      <div className='top-bar-badge-wrapper-context-menu-prefix'>
        <AvatarWrapper size='large' redirect onClick={closeContextMenu} />
        <ContextMenuPrefix onClick={closeContextMenu} />
      </div>
    </ContextMenu>
  );

  return (
    <div className='top-bar-badge-wrapper'>
      <AvatarWrapper size='medium' onClick={toggleMenu} />
      {!isMobile && contextMenu}
    </div>
  );
};

export default memo(ContextMenuWrapper);
