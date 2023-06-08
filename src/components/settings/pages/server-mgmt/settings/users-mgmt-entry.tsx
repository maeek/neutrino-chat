import UserAvatar from '@/components/common/user-components/avatar';
import './users-mgmt-entry.scss';
import { getUserById } from '@/selectors/users';
import { useSelector } from 'react-redux';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import {
  DeleteRounded,
  LockRounded,
  MoreHorizRounded
} from '@material-ui/icons';
import { Text } from '@maeek/neutrino-design';

export interface UsersMgmtEntryProps {
  id: string;
}

export const UsersMgmtEntry = ({ id }: UsersMgmtEntryProps) => {
  const user = useSelector(getUserById(id));
  return (
    <li key={id} className='user-mgmt-list-entry'>
      <div className='user-mgmt-list-entry-details'>
        <div className='user-mgmt-list-entry-details-avatar'>
          <UserAvatar
            color={getHslColorFromCharCode(id)}
            url={user.avatar}
            size={'medium'}
            status={user.status}
            username={user.id}
          />
        </div>
        <div className='user-mgmt-list-entry-details-title'>{id}</div>
      </div>
      <div className='user-mgmt-list-entry-actions'>
        <Text tabIndex={0} className='user-mgmt-action' type='secondary'>
          <MoreHorizRounded />
        </Text>
      </div>
    </li>
  );
};
