import {
  FC,
  useState,
  KeyboardEvent,
  useRef,
  useEffect
} from 'react';
import { Drawer } from '@maeek/neutrino-design/components/molecules/drawer';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { NotificationsNoneRounded } from '@material-ui/icons';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import './styles/top-bar.scss';
import './styles/notifications-drawer.scss';

export interface NotificationsDrawerProps {
  [key: string]: any;
}

export const NotificationsDrawer: FC<NotificationsDrawerProps> = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const bellIconRef = useRef<HTMLSpanElement>(null);

  const onEnter = (fn: Function) => (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      fn();
    }
  };

  const handleOpen = () => {
    setIsOpened(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsOpened(false);
    document.body.style.overflow = 'auto';
    if (bellIconRef.current) bellIconRef.current.focus();
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <span className="top-bar-button">
      <span
        className="top-bar-button-icon"
        tabIndex={0}
        onClick={handleOpen}
        onKeyUp={onEnter(handleOpen)}
        ref={bellIconRef}
      >
        <NotificationsNoneRounded />
      </span>
      <Drawer
        isOpened={isOpened}
        animationDuration={100}
        onClose={handleClose}
        showMask
        className="top-bar-notifications-drawer"
      >
        <div className="top-bar-notifications-drawer-content-header">
          <span
            tabIndex={0}
            className="top-bar-button-icon"
            onClick={handleClose}
            onKeyUp={onEnter(handleClose)}
          >
            <ArrowForwardRoundedIcon />
          </span>
          <Heading level={5}>Notifications</Heading>
        </div>
        <div className="top-bar-notifications-drawer-spacer" />
      </Drawer>
    </span>
  );
};

export default NotificationsDrawer;
