import classNames from 'classnames';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import UserAvatar from '../../common/user-components/avatar';
import UsernameFull from '../../common/user-components/username-full';
import DetailsButtonShowMore from '../details-buttons/details-more';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import { User } from '@/store/users/types';
import { Text } from '@maeek/neutrino-design/components/typography/text/Text';
import Loader from '@maeek/neutrino-design/components/loaders/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { modifyUsers } from '@/store/users/actions';
import { MouseEventHandler } from 'react';
import { BlockRounded, NewReleasesRounded } from '@material-ui/icons';
import { Chip } from '../chip/chip';
import Navigator from '@/utils/navigation';
import { useHistory } from 'react-router-dom';
import { getMeUsername } from '@/selectors/user';
import './user-info.scss';
import { ApiMe } from '@/api/me';
import { getMutedUsers } from '@/selectors/muted';

export interface UserInfoProps {
  isMinified?: boolean;
  user: User;
}

export const UserInfo = ({ user, isMinified }: UserInfoProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const blockedUsers = useSelector(getMutedUsers);
  const username = useSelector(getMeUsername);

  const toggleBlock: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!user) return;

    console.log([ ...blockedUsers.filter(u => u !== user.id), user.muted ? undefined : user.id ]);

    ApiMe.updateUser(username, {
      mutedUsers: [ ...blockedUsers.filter(u => u !== user.id), user.muted ? undefined : user.id ]
    })
      .then((response) => {
        console.warn(response);
        dispatch(modifyUsers([ { id: user.id, muted: !user.muted } ]));
      }).catch((e) => {
        console.error(e);
      });
  };

  const blockNode = !user.muted && user.id !== username ? (
    <>
      <div className='user-info-chips'>
        <Chip onClick={toggleBlock}>
          <Text className='user-info-block' type='danger'>
            <BlockRounded /> Block
          </Text>
        </Chip>
      </div>
    </>
  ) : (
    <>
      <Text type='secondary' className='user-info-blocked'>
        This user is blocked, you cannot send them messages unless you unblock
        them
      </Text>
      <div className='user-info-chips'>
        <Chip onClick={toggleBlock}>
          <Text className='user-info-block' type='danger'>
            <BlockRounded /> Unblock
          </Text>
        </Chip>
      </div>
    </>
  );

  const goBack = () => Navigator.forward(history, '/');

  const backNode = isMinified ? (
    <div className='user-info-back' onClick={goBack}>
      <ArrowBackRounded />
    </div>
  ) : null;

  return (
    <>
      <div
        className={classNames(
          'user-info',
          isMinified && 'user-info--minified',
          user.muted && 'user-info--blocked'
        )}
      >
        <div className='user-info-container'>
          {backNode}
          <UserAvatar
            className={!isMinified ? '' : 'reset-margin'}
            color={getHslColorFromCharCode(user.id || '')}
            url={user.avatar}
            size={isMinified ? 'medium' : 'extra-large'}
            expandOnClick
            loader={<Loader />}
          />
          <UsernameFull
            id={user.id}
            nickname={
              username === user.id ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>Note to self</span>
                  <NewReleasesRounded
                    style={{
                      color: 'var(--clr-actions-400)',
                      marginLeft: '0.3rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              ) : undefined
            }
          />
        </div>
        <DetailsButtonShowMore
          isVisible={isMinified}
          onClick={() => Navigator.forward(history, `/u/${user.id}`)}
        />
      </div>
      {!isMinified && blockNode}
    </>
  );
};

export default UserInfo;
