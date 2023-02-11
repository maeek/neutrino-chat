import {
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
  useRef,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserIsInStarred, getUserById } from '@/selectors/users';
import { RootState } from '@/store/root';
import DeleteSweepRoundedIcon from '@material-ui/icons/DeleteSweepRounded';
import {
  ContextMenu,
  ContextMenuItems
} from '@maeek/neutrino-design/components/context-menu/Menu';
import { Heading } from '@maeek/neutrino-design/components/typography/heading';
import {
  TextType,
  Text
} from '@maeek/neutrino-design/components/typography/text/Text';
import {
  addMembersToGroup,
  removeMembersFromGroup
} from '@/store/me/groups/actions';
import { GroupTypeEnum } from '@/store/me/groups/types';
import Navigator from '@/utils/navigation';
import { BlockRounded, StarRounded } from '@material-ui/icons';
import { User, UserStatusEnum } from '@/store/users/types';
import { StatusDot, StatusDotState } from '@/components/common/status-dot';
import { UserCardPicture } from './picture';
import './card.scss';
import { AddToGroup } from '@/components/common/add-to-group';
import { Modal } from '@maeek/neutrino-design';
import { modifyUsers } from '@/store/users/actions';

export interface UserCardProps {
  id: string;
}

export interface RelativeCursorPos {
  relX: number;
  relY: number;
  x: number;
  y: number;
  recalculated?: boolean;
}

export const UserCard = ({ id }: UserCardProps) => {
  const user = useSelector<RootState, User>(getUserById(id));
  const userIsInStarred = useSelector(getUserIsInStarred(id));
  const [showGroupSelection, setShowGroupSelection] = useState(false);

  const ref = useRef<HTMLLIElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [relativeCursorPos, setRelativeCursorPos] =
    useState<RelativeCursorPos | null>(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleStar: MouseEventHandler = (e) => {
    stopPropagation(e);

    if (userIsInStarred) {
      dispatch(removeMembersFromGroup('Starred', [id]));
    } else {
      dispatch(
        addMembersToGroup('Starred', [{ id, type: GroupTypeEnum.USER }])
      );
    }
  };

  const navToUser: MouseEventHandler = (e) => {
    e.preventDefault();
    Navigator.forward(history, `/u/${user.id}/chat`);
  };

  const onAccessibility =
    (fn: Function): KeyboardEventHandler =>
    (e) => {
      if (['Enter', ' '].includes(e.code)) {
        fn(e);
      }
    };

  const stopPropagation: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getStatus = () => {
    switch (user?.status) {
      case UserStatusEnum.ACTIVE:
        return 'Online';
      case UserStatusEnum.AWAY:
        return 'Away';
      case UserStatusEnum.OFFLINE:
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  const mapStatusToType = (
    status: 'Online' | 'Offline' | 'Away' | 'Unknown'
  ): TextType => {
    switch (status) {
      case 'Online':
        return 'success';
      case 'Away':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const mapStatusToDotStatus = (
    status: 'Online' | 'Offline' | 'Away' | 'Unknown'
  ) => status.toLowerCase() as StatusDotState;

  const onContextMenu: MouseEventHandler = (e) => {
    e.preventDefault();

    setRelativeCursorPos(null);
    setShowContextMenu(true);

    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRelativeCursorPos({ relX: x, relY: y, x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const { relX, relY, x, y, recalculated } = relativeCursorPos || {};

    if (!menuRef.current || !x || !y || recalculated) {
      return;
    }

    let newX = relX || 0;
    let newY = relY || 0;

    const menuRect = menuRef.current.getBoundingClientRect();

    if (x + menuRect.width > window.innerWidth) {
      newX -= menuRect.width;
    }

    if (y + menuRect.height > window.innerHeight) {
      newY -= menuRect.height;
    }

    setRelativeCursorPos({
      x,
      y,
      relX: newX,
      relY: newY,
      recalculated: true
    });
  }, [relativeCursorPos]);

  const items: ContextMenuItems[] = [
    {
      text: userIsInStarred ? 'Remove Star' : 'Star',
      icon: userIsInStarred ? <StarRounded className='user-card-star' /> : null,
      closeOnClick: true,
      onClick: handleStar
    },
    {
      text: 'Edit Nickname',
      closeOnClick: true,
      onClick: stopPropagation
    },
    {
      text: 'Add to Group',
      closeOnClick: true,
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        setShowGroupSelection((prev) => !prev);
      }
    },
    {
      text: user?.blocked ? 'Unblock' : 'Block',
      icon: user?.blocked ? <BlockRounded /> : null,
      closeOnClick: true,
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(modifyUsers([{ id: user.id, blocked: !user.blocked }]));
      }
    },
    ...(user?.messages && user?.messages?.length > 0
      ? [
          {
            text: 'Clear History',
            icon: <DeleteSweepRoundedIcon />,
            closeOnClick: true,
            onClick: stopPropagation
          }
        ]
      : [])
    // {
    //   text: 'Remove',
    //   closeOnClick: true,
    //   onClick: stopPropagation
    // }
  ];

  const contextMenu = (
    <ContextMenu
      innerRef={menuRef}
      items={items}
      closeContextMenu={() => setShowContextMenu(false)}
      className={`user-card-context-menu ${
        relativeCursorPos?.recalculated ? 'user-card-context-menu--display' : ''
      }`}
      style={{ top: relativeCursorPos?.relY, left: relativeCursorPos?.relX }}
    />
  );

  const starredNode = userIsInStarred ? (
    <div
      className='user-card-emblems-star'
      data-starred={userIsInStarred}
      title='Remove from starred'
      onClick={handleStar}
      onKeyUp={onAccessibility(handleStar)}
      tabIndex={0}
    >
      <StarRounded />
    </div>
  ) : null;

  const firstNameText = user.nickname
    ? user.nickname
    : user?.name && user.id !== user?.name
    ? user.name
    : user.id;

  const firstName = (
    <Text className='user-card-name-first'>
      {firstNameText.length > 175
        ? `${firstNameText.substr(0, 175)}...`
        : firstNameText}
    </Text>
  );

  const originalName =
    user.nickname || (user?.name && user.id !== user?.name) ? (
      <Text type='secondary' monospace>
        @{user.id.length > 175 ? `${user.id.substr(0, 175)}...` : user.id}
        {user.nickname && user.name && user.id !== user.name ? (
          <Text monospace disabled className='user-card-name-full'>
            {' '}
            (
            {user.name.length > 175
              ? `${user.name.substr(0, 175)}...`
              : user.name}
            )
          </Text>
        ) : null}
      </Text>
    ) : null;

  return (
    <li className='card user-card' onContextMenu={onContextMenu} ref={ref}>
      <a href={`/u/${user.id}/chat`} onClick={navToUser}>
        <figure>
          <figcaption>
            <div className='user-card-emblems'>
              {user?.blocked ? (
                <Text
                  strong
                  type='secondary'
                  className='user-card-emblems-blocked'
                >
                  Blocked
                </Text>
              ) : null}
              {starredNode}
            </div>

            <Heading className='user-card-name' level={4}>
              {firstName}
              {originalName}
              <Text
                type={mapStatusToType(getStatus())}
                className='user-card-status'
              >
                <StatusDot
                  state={mapStatusToDotStatus(getStatus())}
                  className='user-card-status-dot'
                />
                {getStatus()}
              </Text>
            </Heading>
          </figcaption>

          <UserCardPicture id={id} />

          {showContextMenu ? contextMenu : null}
        </figure>
      </a>
      {showGroupSelection ? (
        <Modal>
          <AddToGroup
            item={user.id}
            onDismiss={() => setShowGroupSelection((prev) => !prev)}
          />
        </Modal>
      ) : null}
    </li>
  );
};
