import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import Navigator from '@/utils/navigation';
import NavigationControlls from '@/components/common/navigation-controlls/navigation';
import { ContextMenuWrapper } from './context-menu/context-menu-wrapper';
import NotificationsDrawer from './drawer/';
import './top-bar.scss';

export interface TopBarProps {
  [key: string]: any;
}

export const TopBar = () => {
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const onHeadingClick = (e: MouseEvent) => {
    e.preventDefault();
    Navigator.forward(history, '/');
  };

  return (
    <nav className="top-bar">
      <div className="top-bar-inner">
        <div className="top-bar-left">
          <NavigationControlls pwaOnly />
          <Heading level={1} className="top-bar-heading" tabIndex={0}>
            <Text type="primary" link="/" onClick={onHeadingClick}>
              {!isMobile ? 'Neutrino Chat' : 'Neutrino'}
            </Text>
          </Heading>
        </div>
        <div className="top-bar-right">
          <NotificationsDrawer />
          {!isMobile && <ContextMenuWrapper />}
        </div>
      </div>
    </nav>
  );
};

export default memo(TopBar) ;
