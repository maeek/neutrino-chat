import { memo, ReactNode, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavItem from '@maeek/neutrino-design/components/molecules/navigation/Item';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import { StarsRounded, DehazeRounded, ArrowUpwardRounded, FormatListBulletedRounded, MoreHorizRounded } from '@material-ui/icons';
import { Groups, GroupsEntry } from '@store/me/groups/types';
import { getMeGroups, getMeGroupsList } from '@selectors/groups';
import { RootState } from '@store/root';
import { getFiltersGroup } from '@selectors/filters';
import { setFilterGroup } from '@store/app/filters/actions';

export interface GroupsListProps {}

export const GroupsList = memo((props: GroupsListProps) => {
  const SHOW_PER_PAGE = 10;
  const [groups, groupsList] = useSelector<RootState, [GroupsEntry, Groups[]]>(
    (state) => [
      getMeGroups(state),
      getMeGroupsList(state).slice(1) // Skip "Starred"
    ]
  );
  const [groupsExpanded, setGroupsExpanded] = useState(false);
  const [showPagesInNumber, setShowPagesInNumber] = useState(0);
  const selectedGroup = useSelector(getFiltersGroup);
  const dispatch = useDispatch();

  const setSelectedGroup = useCallback((group: string) => () => {
    dispatch(setFilterGroup(selectedGroup === group ? '' : group));
  }, [dispatch, selectedGroup]);

  const selectedGroupNode: ReactNode = groups[selectedGroup] && (
    <NavItem
      icon={selectedGroup === 'Starred' ? <StarsRounded /> : <DehazeRounded />}
      onClick={setSelectedGroup('')}
      active
    >
      {groups[selectedGroup].name}
    </NavItem>
  );

  const groupsExpandedNode = (
    <>
      { groupsList.slice(0, (showPagesInNumber + 1) * SHOW_PER_PAGE).map(group => (
        <NavItem
          key={JSON.stringify(group)}
          icon={group.name === 'Starred' ? <StarsRounded /> : <DehazeRounded />}
          onClick={setSelectedGroup(group.name)}
          active={selectedGroup === group.name}
        >
          {group.name}
        </NavItem>
      ))}

      {
        groupsList.slice((showPagesInNumber + 1) * SHOW_PER_PAGE).length > 0 && (
          <NavItem
            icon={<MoreHorizRounded />}
            onClick={() => setShowPagesInNumber(prevState => prevState + 1)}
          >
            Show more
          </NavItem>
        )
      }

      {
        groupsList.length < 2 && (
          <div className="side-nav-groups--empty">
            <Text className="side-nav-groups--heading" strong disabled> You have "0" Groups</Text>
            <Text className="side-nav-groups--desc" disabled>
              Custom Groups lets you group your favourite Contacts and Channels into a single folder.
              This way you can filter out unrelevant channels to get where you need to go.
            </Text>
            <Text className="side-nav-groups--new" link="/me/groups/new">Learn how to create new Group</Text>
          </div>
        )
      }
    </>
  );

  return (
    <>
      {(!selectedGroupNode || selectedGroup !== 'Starred' || groupsExpanded) && (
        <NavItem
          icon={<StarsRounded />}
          onClick={setSelectedGroup('Starred')}
          active={selectedGroup === 'Starred'}
        >
          Starred
        </NavItem>
      )}

      { !groupsExpanded && selectedGroupNode }
      { groupsExpanded && groupsExpandedNode }
      
      <NavItem
        icon={groupsExpanded ? <ArrowUpwardRounded /> : <FormatListBulletedRounded />}
        onClick={() => {
          setShowPagesInNumber(1);
          setGroupsExpanded(prevState => !prevState);
        }}
      >
        Custom Groups
      </NavItem>
    </>
  );
});
