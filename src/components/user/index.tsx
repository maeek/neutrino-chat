import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getUserById } from '@/selectors/users';
import {
  setMobileBottomNavVisibility,
  setTopBarVisibility
} from '@/store/app/ui/actions';
import Navigator from '@/utils/navigation';
import { UserPageParams } from '@/views/user/User';
import UserInfo from './user-info/user-info';
import './user.scss';
import { Chat } from '../common/chat/chat';
import { MessageTypes } from '@/store/messages/types';

interface UserLocationState {
  isChat?: boolean;
}

export const UserView = () => {
  const { username } = useParams<UserPageParams>();
  const location = useLocation<UserLocationState>();
  const history = useHistory();
  const user = useSelector(getUserById(username));
  const dispatch = useDispatch();
  const [isInfoMinified, setIsInfoMinified] = useState(false);

  const toggleVisibility = () => {
    if (isInfoMinified) {
      Navigator.back(history);
      return;
    }

    Navigator.forward(history, location.pathname, {
      isChat: true
    });
  };

  useLayoutEffect(() => {
    const state = location?.state?.isChat;
    dispatch(setMobileBottomNavVisibility(state));
    dispatch(setTopBarVisibility(state));
    setIsInfoMinified(!!state);
  }, [dispatch, location]);

  useEffect(
    () => () => {
      dispatch(setMobileBottomNavVisibility(false));
      dispatch(setTopBarVisibility(false));
    },
    [dispatch]
  );

  if (!user) {
    return <></>;
  }

  return (
    <div className='view-root view-root--user'>
      <UserInfo
        user={user}
        isMinified={isInfoMinified}
        onToggle={toggleVisibility}
      />
      {isInfoMinified && (
        <div className='view-root--user--minified-move'>
          <Chat id={user.id} type={MessageTypes.DIRECT} />
        </div>
      )}
    </div>
  );
};

export default UserView;
