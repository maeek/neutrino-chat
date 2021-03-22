import { FC, useState, useCallback } from 'react';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import { KeyboardArrowLeftRounded, KeyboardArrowRightRounded } from '@material-ui/icons';
import { ContextMenu } from '@maeek/neutrino-design/components/molecules/context-menu';
import './styles/notifications.scss';

export interface NotificationsWrapperProps {
}

export const NotificationsWrapper: FC<NotificationsWrapperProps> = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const items = [
    {
      index: 0,
      text: 'Mute for 10 minutes',
      closeOnClick: true
    },
    {
      index: 1,
      text: 'Mute for 30 minutes',
      closeOnClick: true
    },
    {
      index: 2,
      text: 'Mute for 1 hour',
      closeOnClick: true
    },
    {
      index: 3,
      text: 'Custom',
      closeOnClick: true
    }
  ];

  const toggleMenu = useCallback(() => setShowMenu(!showMenu), [setShowMenu, showMenu]);

  const iconNode = showMenu ? <KeyboardArrowRightRounded /> : <KeyboardArrowLeftRounded />;

  return (
    <div className="top-bar-context-menu-notifications-wrapper" onClick={toggleMenu}>
      <div className="top-bar-context-menu-notifications-wrapper-heading">
        <span className="top-bar-context-menu-notifications-wrapper-heading-icon">
          {iconNode}
        </span>
        <Text>Notifications</Text>
      </div>
      {showMenu ? <ContextMenu items={items} className="top-bar-context-menu-notifications-wrapper-child" closeContextMenu={toggleMenu} /> : null}
    </div>
  );
};
