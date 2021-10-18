import classNames from 'classnames';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';
import UserAvatar from '../../common/user-components/avatar';
import UserBanner from '../../common/user-components/banner';
import UsernameFull from '../../common/user-components/username-full';
import DetailsButtonShowLess from '../details-buttons/details-less';
import DetailsButtonShowMore from '../details-buttons/details-more';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { User } from '@/store/users/types';
import { Text } from '@maeek/neutrino-design';
import { useDispatch, useSelector } from 'react-redux';
import { modifyUsers } from '@/store/users/actions';
import { MouseEventHandler, useState } from 'react';
import { BlockRounded, GroupAddRounded, NotificationsRounded, StarBorderRounded, StarRounded } from '@material-ui/icons';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { Chip } from '../chip/chip';
import { getUserIsInStarred } from '@/selectors/users';
import { removeMembersFromGroup, addMembersToGroup } from '@/store/me/groups/actions';
import { GroupTypeEnum } from '@/store/me/groups/types';
import { checkIfUserIsMuted } from '@/selectors/muted';
import './user-info.scss';
import { muteUser, unmuteUser } from '@/store/settings/muted/actions';
import { AddToGroup } from '@/components/common/add-to-group';

export interface UserInfoProps {
  isMinified?: boolean;
  onToggle?: () => void;
  user: User;
}

export const UserInfo = ({ user, isMinified, onToggle }: UserInfoProps) => {
  const dispatch = useDispatch();
  const userIsInStarred = useSelector(getUserIsInStarred(user.id));
  const userIsInMuted = useSelector(checkIfUserIsMuted(user.id));
  const [ showGroupSelection, setShowGroupSelection ] = useState(false);

  const toggleBlock: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(modifyUsers([ { id: user.id, blocked: !user.blocked } ]));
  };

  const toggleMute: MouseEventHandler = (e) => {
    e.preventDefault();

    if (userIsInMuted) {
      dispatch(unmuteUser([ user.id ]));
    } else {
      dispatch(muteUser([ user.id ]));
    }
  };

  const toggleStar: MouseEventHandler = (e) => {
    e.preventDefault();

    if (userIsInStarred) {
      dispatch(removeMembersFromGroup('Starred', [ user.id ]));
    } else {
      dispatch(addMembersToGroup('Starred', [ { id: user.id, type: GroupTypeEnum.USER } ]));
    }
  };

  const blockNode = (
    !user.blocked ? (
      <>

        <div className="user-info-chips">
          <Chip onClick={toggleStar}>
            <Text className="user-info-star">
              {
                !userIsInStarred ? (
                  <><StarBorderRounded /> Add to Starred</>
                ) : (
                  <><StarRounded /> Remove from Starred</>
                )
              }
            </Text>
          </Chip>
          <Chip>
            <Text className="user-info-addto" onClick={() => setShowGroupSelection(prev => !prev)}>
              <GroupAddRounded /> Add to Group
            </Text>
          </Chip>
          <Chip onClick={toggleMute}>
            <Text className="user-info-mute" title={userIsInMuted ? 'Click to unmute' : 'Click to mute'}>
              {
                userIsInMuted
                  ? (
                    <><NotificationsOffIcon /> Click to unmute</>
                  ) : (
                    <><NotificationsRounded /> Snooze Notifications</>
                  )
              }
            </Text>
          </Chip>
          <Chip onClick={toggleBlock}>
            <Text
              className="user-info-block"
              type="danger"
            >
              <BlockRounded /> Block
            </Text>
          </Chip>
        </div>
        <DetailsButtonShowLess
          isVisible={!isMinified}
          onClick={onToggle}
        />
      </>
    ) : (
      <>
        <Text type="secondary" className="user-info-blocked">
          This user is blocked, you cannot send them messages unless you unblock them
        </Text>
        <div className="user-info-chips">
          <Chip onClick={toggleBlock}>
            <Text
              className="user-info-block"
              type="danger"
            >
              <BlockRounded /> Unblock
            </Text>
          </Chip>
        </div>
      </>
    )
  );

  const backNode = isMinified 
    ? (
      <div className="user-info-back" onClick={onToggle}>
        <ArrowBackIosIcon />
      </div>
    )
    : null;

  return (
    <>
      <div className={classNames(
        'user-info',
        isMinified && 'user-info--minified',
        user.blocked && 'user-info--blocked'
      )}>
        <div className="user-info-container">
          {backNode}
          {user.banner && !isMinified && <UserBanner expandOnClick url={user.banner} />}
          <UserAvatar
            className={user.banner && !isMinified ? '' : 'reset-margin'}
            color={getHslColorFromCharCode(user.name)}
            url={user.avatar}
            size={isMinified ? 'medium' : 'extra-large'}
            expandOnClick
            status={isMinified ? user.status : undefined}
          />
          <UsernameFull
            nickname={user.nickname}
            id={user.name}
            name={user.name}
            status={user.status}
            hideStatus={!isMinified}
          />
        </div>
        <DetailsButtonShowMore
          isVisible={isMinified}
          onClick={onToggle}
        />
      </div>
      {!isMinified && blockNode}

      {
        showGroupSelection 
          ? (
            <AddToGroup item={user.id} onDismiss={() => setShowGroupSelection(prev => !prev)} />
          ) :null
      }
    </>
  );
};

export default UserInfo;
