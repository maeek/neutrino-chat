import { memo, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import NavigationControlls from '@/components/common/navigation-controlls/navigation';
import { ContextMenuWrapper } from './context-menu/context-menu-wrapper';
import { TopBarHeading } from './heading';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { isAppUITopBarHidden } from '@/selectors/app-ui';
import { setTopBarVisibility } from '@/store/app/ui/actions';
import './top-bar.scss';

export const TopBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isHidden = useSelector(isAppUITopBarHidden);

  useEffect(() => {
    if (
      (isMobile &&
        ([ '/me', '/' ].includes(location.pathname) ||
          location.pathname.startsWith('/settings'))) ||
      location.pathname.endsWith('/chat')
    ) {
      dispatch(setTopBarVisibility(true));
    }

    return () => {
      dispatch(setTopBarVisibility(false));
    };
  }, [ isMobile, location.pathname ]);

  return (
    <nav className={classNames('top-bar', !isHidden && 'top-bar--visible')}>
      <div className='top-bar-inner'>
        <div className='top-bar-left'>
          <NavigationControlls pwaOnly />
          <TopBarHeading />
        </div>
        <div className='top-bar-right'>
          <ContextMenuWrapper />
        </div>
      </div>
    </nav>
  );
};

export default memo(TopBar);
