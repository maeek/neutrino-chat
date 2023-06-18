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
import { MouseEventHandler, useState } from 'react';
import {
  BlockRounded,
  NewReleasesRounded,
  VerifiedUser,
  VerifiedUserRounded
} from '@material-ui/icons';
import { Chip } from '../chip/chip';
import { checkIfUserIsMuted } from '@/selectors/muted';
import { AddToGroup } from '@/components/common/add-to-group';
import Navigator from '@/utils/navigation';
import { useHistory } from 'react-router-dom';
import './user-info.scss';
import { getMeUsername } from '@/selectors/user';

export interface UserInfoProps {
  isMinified?: boolean;
  onToggle?: () => void;
  user: User;
}

export const UserInfo = ({ user, isMinified, onToggle }: UserInfoProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedUser = useSelector(getMeUsername);

  const toggleBlock: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(modifyUsers([ { id: user.id, muted: !user.muted } ]));
  };

  const blockNode = !user.muted ? (
    <>
      <div className='user-info-chips'>
        {/* <Chip>
          <Text
            className='user-info-addto'
            onClick={() => setShowGroupSelection((prev) => !prev)}
          >
            <GroupAddRounded /> Add to Group
          </Text>
        </Chip> */}
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
              loggedUser === user.id ? (
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

      {/* {showGroupSelection ? (
        <AddToGroup
          item={user.id}
          onDismiss={() => setShowGroupSelection((prev) => !prev)}
        />
      ) : null} */}
    </>
  );
};

export default UserInfo;
