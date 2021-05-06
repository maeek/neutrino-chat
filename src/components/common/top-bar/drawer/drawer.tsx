import {
  KeyboardEvent,
  useEffect
} from 'react';
import { Drawer } from '@maeek/neutrino-design/components/molecules/drawer';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import './drawer.scss';

export interface NotificationsDrawerProps {
  isOpened?: boolean;
  onClose?: () => void;
}

export const NotificationsDrawerWrapper = ({ isOpened, onClose }: NotificationsDrawerProps) => {
  const onEnter = (fn?: () => void) => (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' && fn) {
      fn();
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Drawer
      position="right"
      isOpened={isOpened}
      animationSpeed={100}
      onClose={onClose}
      showMask
      className="top-bar-notifications-drawer"
    >
      <div className="top-bar-notifications-drawer-content-header">
        <span
          tabIndex={0}
          className="top-bar-button-icon"
          onClick={onClose}
          onKeyUp={onEnter(onClose)}
        >
          <ArrowForwardRoundedIcon />
        </span>
        <Heading level={5}>Notifications</Heading>
      </div>
      <div className="top-bar-notifications-drawer-spacer" />

      <div className="top-bar-notifications-drawer-notifications">
        <Text disabled>No recent notifications</Text>
      </div>
    </Drawer>
  );
};

export default NotificationsDrawerWrapper;
