import { FC, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import Navigator from '@utils/navigation';
import NavigationControlls from '@components/common/navigation-controlls/navigation';
import { ContextMenuWrapper } from './context-menu/context-menu-wrapper';
import NotificationsDrawer from './notifications-drawer';
import './styles/top-bar.scss';

export interface TopBarProps {
  [key: string]: any;
}

export const TopBar: FC<TopBarProps> = () => {
  const history = useHistory();

  const onHeadingClick = (e: MouseEvent) => {
    e.preventDefault();
    Navigator.forward(history, '/');
  };

  return (
    <nav className="top-bar">
      <NavigationControlls pwaOnly={false} />
      <div className="top-bar-inner">
        <Heading level={1} className="top-bar-heading" tabIndex={0}>
          <Text type="primary" link={process.env.PUBLIC_URL} onClick={onHeadingClick}>Neutrino Chat</Text>
        </Heading>
        <div className="top-bar-right">
          <NotificationsDrawer />
          <ContextMenuWrapper />
        </div>
      </div>
    </nav>
  );
};

export default memo(TopBar) ;
