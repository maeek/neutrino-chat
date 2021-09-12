import { UserPageParams } from '@/views/user/User';
import { LayoutSideContent } from '@maeek/neutrino-design';
import { useParams } from 'react-router-dom';
import UserAvatar from '../common/user-components/avatar';
import UserUsername from '../common/user-components/username';
import './user.scss';

export const UserView = () => {
  const { username } = useParams<UserPageParams>();

  const sideNode = (
    <>
      {/* <UserUsername username={username} />
      <div>
        <UserAvatar
          username={username}
        />
      </div> */}
    </>
  );

  return (
    <div className="view-root view-root--user">
      <LayoutSideContent sideNode={sideNode}>
      </LayoutSideContent>
    </div>
  );
};

export default UserView;
