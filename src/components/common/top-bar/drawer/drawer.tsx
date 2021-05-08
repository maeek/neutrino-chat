import {
  KeyboardEvent,
  useEffect
} from 'react';
import { useMediaQuery } from 'react-responsive';
import { Drawer } from '@maeek/neutrino-design/components/molecules/drawer';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import InboxRounded from '@material-ui/icons/InboxRounded';
import CloseRounded from '@material-ui/icons/CloseRounded';
import './drawer.scss';

export interface NotificationsDrawerProps {
  isOpened?: boolean;
  onClose?: () => void;
}

export const NotificationsDrawerWrapper = ({ isOpened, onClose }: NotificationsDrawerProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

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
      position={isMobile ? 'top' : 'right'}
      isOpened={isOpened}
      animationSpeed={250}
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
          {
            isMobile
              ? <CloseRounded />
              : <ArrowForwardRoundedIcon />
          }
        </span>
        <Heading level={5}>Notifications</Heading>
      </div>
      <div className="top-bar-notifications-drawer-spacer" />

      <div className="top-bar-notifications-drawer-empty">
        <InboxRounded />
        <Text strong disabled>You have 0 notifications!</Text>
      </div>
    </Drawer>
  );
};

export default NotificationsDrawerWrapper;
