import { GroupActionsEnum, GroupItem, GroupMemebersActionTypes, GroupsActionTypes, GroupsEntry, GroupsState } from './types';

export const initialState: GroupsState = {
  entries: {
    Starred: {
      name: 'Starred',
      items: []
    }
  }
};

const groupsReducer = (state = initialState, action: GroupsActionTypes | GroupMemebersActionTypes) => {
  switch (action.type) {
  case GroupActionsEnum.ADD_GROUP:
    const newGroups: GroupsEntry = {};

    action.data.groups.forEach((group: string) => {
      newGroups[group] = {
        name: group,
        items: []
      };
    });

    return {
      entries: {
        ...state.entries,
        ...newGroups
      }
    };

  case GroupActionsEnum.REMOVE_GROUP:
    const updatedGroups = {...state.entries};

    action.data.groups.forEach((group: string) => {
      if (group !== 'Starred') delete updatedGroups[group];
    });

    return {
      entries: updatedGroups
    };

  case GroupActionsEnum.CLEAR_GROUPS:
    return {
      entries: {
        Starred: {
          name: 'Starred',
          items: state.entries.Starred.items
        }
      }
    };

  case GroupActionsEnum.RENAME_GROUP:
    const renamedGroup = {
      ...state.entries
    };

    delete renamedGroup[action.data.group.id];

    renamedGroup[action.data.group.name] = {
      name: action.data.group.name,
      items: state.entries[action.data.group.id].items
    };

    return {
      entries: renamedGroup
    };

  case GroupActionsEnum.ADD_MEMBER:
    return {
      entries: {
        ...state.entries,
        [action.data.group.id]: {
          name: action.data.group.id,
          items: [
            ...state.entries[action.data.group.id].items,
            ...action.data.group.items
          ]
        }
      }
    };

  case GroupActionsEnum.REMOVE_MEMBER:
    const updatedItems: GroupItem[] = [
      ...state.entries[action.data.group.id].items
        .filter((item: GroupItem) => !action.data.group.items.includes(item.id))
    ];

    return {
      ...state,
      entries: {
        ...state.entries,
        [action.data.group.id]: {
          name: action.data.group.id,
          items: updatedItems
        }
      }
    };

  case GroupActionsEnum.CLEAR_MEMBERS:
    return {
      ...state,
      entries: {
        ...state.entries,
        [action.data.group.id]: {
          name: action.data.group.id,
          items: []
        }
      }
    };

  default:
    return state;
  }
};

export default groupsReducer;
// export { addTogroups, removeFromgroups } from './actions';
