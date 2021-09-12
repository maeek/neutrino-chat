import { useState, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ContextMenu, { ContextMenuItems } from '@maeek/neutrino-design/components/molecules/context-menu/Menu';
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
  const [ showContext, setShowContext ] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleMenu = useCallback(() => setShowContext(!showContext), [ setShowContext, showContext ]);
  const closeContextMenu = useCallback(() => setShowContext(false), [ setShowContext ]);

  const navigate = (link: string) => () => {
    Navigator.forward(history, link);
  };

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
      onClick: navigate('/settings')
    },
    {
      text: 'Help',
      icon: <HelpOutlineRounded />,
      closeOnClick: true,
      onClick: () => location.href = 'https://github.com/maeek/neutrino-chat.git'
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
    <ContextMenu items={items} className={showContext ? '' : 'context-menu--hidden'} closeContextMenu={closeContextMenu}>
      <div className="top-bar-badge-wrapper-context-menu-prefix">
        <AvatarWrapper size="large" />
        <ContextMenuPrefix />
      </div>
    </ContextMenu>
  );

  return (
    <div className="top-bar-badge-wrapper">
      <AvatarWrapper size="medium" onClick={toggleMenu} />
      {contextMenu}
    </div>
  );
};

export default memo(ContextMenuWrapper);
