import {
  useState,
  useRef
} from 'react';
import NotificationsDrawerWrapper from './drawer';
import NotificationsDrawerButton from './button';
import './index.scss';

export const NotificationsDrawer = () => {
  const [ isOpened, setIsOpened ] = useState(false);
  const bellIconRef = useRef<HTMLSpanElement>(null);

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleClose = () => {
    setIsOpened(false);
    if (bellIconRef.current) bellIconRef.current.focus();
  };

  return (
    <span className="top-bar-button">
      <NotificationsDrawerButton onOpen={handleOpen} />
      <NotificationsDrawerWrapper isOpened={isOpened} onClose={handleClose} />
    </span>
  );
};

export default NotificationsDrawer;
