import { getMeGroupsList } from '@/selectors/groups';
import { Button } from '@maeek/neutrino-design/components/buttons';
import {
  ContextMenu,
  ContextMenuItems
} from '@maeek/neutrino-design/components/context-menu/Menu';
import { Text } from '@maeek/neutrino-design/components/typography/text/Text';
import { AddRounded, CheckRounded } from '@material-ui/icons';
import CloseRounded from '@material-ui/icons/CloseRounded';
import { useDispatch, useSelector } from 'react-redux';
import { Groups, GroupTypeEnum } from '@/store/me/groups/types';
import {
  addMembersToGroup,
  removeMembersFromGroup
} from '@/store/me/groups/actions';
import './add-to-group.scss';

export interface AddToGroupProps {
  item: string;
  itemType?: GroupTypeEnum;
  onDismiss?: () => void;
  offsetTop?: number;
}

export const AddToGroup = ({
  item,
  itemType = GroupTypeEnum.USER,
  onDismiss
}: AddToGroupProps) => {
  const dispatch = useDispatch();
  const groups = useSelector(getMeGroupsList);

  const addToGroup = (group: Groups) => () => {
    const isInGroup = group.items.find((gi) => gi.id === item);

    if (isInGroup) {
      dispatch(removeMembersFromGroup(group.name, [ item ]));
    } else {
      dispatch(
        addMembersToGroup(group.name, [
          {
            id: item,
            type: itemType
          }
        ])
      );
    }
  };

  const items: ContextMenuItems[] = groups.map((g) => ({
    text: g.name,
    iconPosition: 'right',
    onClick: addToGroup(g),
    icon: g.items.find((gi) => gi.id === item) ? (
      <>
        <CheckRounded className='add-to-group-check' />
        <CloseRounded className='add-to-group-remove' />
      </>
    ) : (
      <AddRounded className='add-to-group-add' />
    )
  }));

  return (
    <div className='add-to-group' onClick={(e) => e.stopPropagation()}>
      <ContextMenu
        items={items}
        suffixNode={
          <Button
            className='add-to-group-dismiss'
            onClick={onDismiss}
            type='button'
          >
            Dismiss
          </Button>
        }
      >
        <div className='add-to-group-prefix-content'>
          <Text>
            Add{' '}
            <Text strong className='prefix-username'>
              {item}
            </Text>{' '}
            to a group.
          </Text>
        </div>
      </ContextMenu>
    </div>
  );
};
