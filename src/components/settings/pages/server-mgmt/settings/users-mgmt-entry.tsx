import UserAvatar from '@/components/common/user-components/avatar';
import { getUserById } from '@/selectors/users';
import { useDispatch, useSelector } from 'react-redux';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import { DeleteRounded, MoreHorizRounded } from '@material-ui/icons';
import { ContextMenu, Text, useClickOutside } from '@maeek/neutrino-design';
import { MutableRefObject, useRef, useState } from 'react';
import { ApiUsers } from '@/api/users';
import { fetchMeBasicInfo } from '@/actions/me';
import { deleteUsersCache } from '@/store/users/actions';
import './users-mgmt-entry.scss';

export interface UsersMgmtEntryProps {
  id: string;
}

export const UsersMgmtEntry = ({ id }: UsersMgmtEntryProps) => {
  const user = useSelector(getUserById(id));
  const [ context, setContext ] = useState(false);
  const contextRef = useRef<HTMLElement>();
  const dispatch = useDispatch();

  useClickOutside(() => {
    setContext(false);
  }, contextRef as MutableRefObject<Element>);

  const items = [
    {
      text: 'Delete',
      icon: <DeleteRounded />,
      closeOnClick: true,
      onClick: () => {
        const confirmed = window.confirm(
          `Do you really want to delete user ${id}?`
        );
        if (!confirmed) return;

        ApiUsers.removeUser(id)
          .then(() => {
            dispatch(deleteUsersCache([ id ]));
            dispatch(fetchMeBasicInfo());
          })
          .catch((e) => console.error(e));
      }
    }
  ];

  return (
    <>
      <li key={id} className='user-mgmt-list-entry'>
        <div className='user-mgmt-list-entry-details'>
          <div className='user-mgmt-list-entry-details-avatar'>
            <UserAvatar
              color={getHslColorFromCharCode(id)}
              url={user?.avatar}
              size={'medium'}
              username={user?.id}
            />
          </div>
          <div className='user-mgmt-list-entry-details-title'>
            <Text strong>{id}</Text>
            <Text
              type='secondary'
              className='user-mgmt-list-entry-details-role'
            >
              {user?.role}
            </Text>
          </div>
        </div>
        {user?.id !== 'admin' && (
          <div className='user-mgmt-list-entry-actions'>
            <Text
              tabIndex={0}
              className='user-mgmt-action'
              type='secondary'
              onClick={() => setContext((prev) => !prev)}
            >
              <MoreHorizRounded />
            </Text>
          </div>
        )}
      </li>
      {user?.id !== 'admin' && context && (
        <ContextMenu
          items={items}
          className='user-mgmt-list-entry-context'
          innerRef={contextRef as any}
          closeContextMenu={() => setContext(false)}
        />
      )}
    </>
  );
};
