import LayoutContentFooter from '@maeek/neutrino-design/components/layouts/content-footer';
import MainSearchBar from '../common/search-bar/search-bar';
import UsersCards from './content/users';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { setTopBarVisibility } from '@/store/app/ui/actions';
import './chats.scss';

export const ChatsView = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (isMobile && location.pathname === '/') {
      dispatch(setTopBarVisibility(true));
    }

    return () => {
      dispatch(setTopBarVisibility(false));
    };
  }, [isMobile, location.pathname]);

  return (
    <div className='view-root view-root--chats'>
      <LayoutContentFooter footerNode={null}>
        <MainSearchBar />
        <UsersCards />
      </LayoutContentFooter>
    </div>
  );
};

export default ChatsView;
