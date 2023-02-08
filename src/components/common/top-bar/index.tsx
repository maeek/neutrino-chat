import { memo, MouseEventHandler } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import NavigationControlls from '@/components/common/navigation-controlls/navigation';
import { ContextMenuWrapper } from './context-menu/context-menu-wrapper';
import NotificationsDrawer from './drawer/';
import { TopBarHeading } from './heading';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import {
  isAppUITopBarHidden,
  isAppUITopBarQuickNavHidden
} from '@/selectors/app-ui';
import { Text } from '@maeek/neutrino-design/components/typography/text';
import Navigator from '@/utils/navigation';
import './top-bar.scss';

export const TopBar = () => {
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isHidden = useSelector(isAppUITopBarHidden);
  const isQuickNavHidden = useSelector(isAppUITopBarQuickNavHidden);

  const onClickLink =
    (link: string): MouseEventHandler =>
    (e) => {
      e.preventDefault();
      Navigator.forward(history, link);
    };

  return (
    <nav className={classNames('top-bar', !isHidden && 'top-bar--visible')}>
      <div className='top-bar-inner'>
        <div className='top-bar-left'>
          <NavigationControlls pwaOnly />
          <TopBarHeading />
          {!isMobile && !isQuickNavHidden ? (
            <div className='main-chats-navigation'>
              <Text link='/browse' onClick={onClickLink('/browse')}>
                Browse
              </Text>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='top-bar-right'>
          {!isMobile && <NotificationsDrawer />}
          <ContextMenuWrapper />
        </div>
      </div>
    </nav>
  );
};

export default memo(TopBar);
