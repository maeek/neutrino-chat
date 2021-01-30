import { GroupActionsEnum, GroupItem, GroupMemebersActionTypes, Groups, GroupsActionTypes, GroupsEntry, GroupsState } from './types';

export const initialState: GroupsState = {
  groups: {
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
        groups: {
          ...state.groups,
          ...newGroups
        }
      };

    case GroupActionsEnum.REMOVE_GROUP:
      const updatedGroups = {...state.groups};

      action.data.groups.forEach((group: string) => {
        if (group !== 'Starred') delete updatedGroups[group];
      });

      return {
        groups: updatedGroups
      }

    case GroupActionsEnum.CLEAR_GROUPS:
      return {
        groups: {
          Starred: {
            name: 'Starred',
            items: state.groups.Starred.items
          }
        }
      };

    case GroupActionsEnum.RENAME_GROUP:
      const renamedGroup = {
        ...state.groups
      };

      delete renamedGroup[action.data.group.id];

      renamedGroup[action.data.group.name] = {
        name: action.data.group.name,
        items: state.groups[action.data.group.id].items
      };

      return {
        groups: renamedGroup
      };

    case GroupActionsEnum.ADD_MEMBER:
      return {
        groups: {
          ...state.groups,
          [action.data.group.id]: {
            name: action.data.group.id,
            items: [
              ...state.groups[action.data.group.id].items,
              ...action.data.group.items
            ]
          }
        }
      };

    case GroupActionsEnum.REMOVE_MEMBER:
      const updatedItems: GroupItem[] = [
        ...state.groups[action.data.group.id].items
          .filter((item: GroupItem) => !action.data.group.items.includes(item.id))
      ];

      return {
        ...state,
        groups: {
          ...state.groups,
          [action.data.group.id]: {
            name: action.data.group.id,
            items: updatedItems
          }
        }
      };

    case GroupActionsEnum.CLEAR_MEMBERS:
      return {
        ...state,
        groups: {
          ...state.groups,
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
