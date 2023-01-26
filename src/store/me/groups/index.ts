import { ClearMe, UserActionsEnum } from '../user/types';
import groupsReducerMock from './mock';
import {
  GroupActionsEnum,
  GroupItem,
  GroupMemebersActionTypes,
  GroupsActionTypes,
  GroupsEntry,
  GroupsState
} from './types';

export const initialState: GroupsState = !!import.meta.env.VITE_DEMO ? groupsReducerMock : {
  entries: {
    Starred: {
      name: 'Starred',
      items: []
    }
  }
};

const groupsReducer = (state = initialState, action: GroupsActionTypes | GroupMemebersActionTypes | ClearMe) => {
  const newGroups: GroupsEntry = { ...state.entries };
  switch (action.type) {
  case GroupActionsEnum.ADD_GROUP:

    action.data.groups.forEach((group: string) => {
      newGroups[ group ] = {
        name: group,
        items: []
      };
    });

    return {
      entries: newGroups
    };

  case GroupActionsEnum.REMOVE_GROUP:
    action.data.groups.forEach((group: string) => {
      if (group !== 'Starred') delete newGroups[ group ];
    });

    return {
      entries: newGroups
    };

  case GroupActionsEnum.CLEAR_GROUPS:
    return {
      entries: {
        Starred: {
          name: 'Starred',
          items: []
        }
      }
    };

  case GroupActionsEnum.RENAME_GROUP:
    delete newGroups[ action.data.group.id ];

    newGroups[ action.data.group.name ] = {
      name: action.data.group.name,
      items: state.entries[ action.data.group.id ].items
    };

    return {
      entries: newGroups
    };

  case GroupActionsEnum.ADD_MEMBER:
    return {
      entries: {
        ...state.entries,
        [ action.data.group.id ]: {
          name: action.data.group.id,
          items: [
            ...state.entries[ action.data.group.id ].items,
            ...action.data.group.items
          ]
        }
      }
    };

  case GroupActionsEnum.REMOVE_MEMBER:
    // eslint-disable-next-line no-case-declarations
    const updatedItems: GroupItem[] = [
      ...state.entries[ action.data.group.id ].items
        .filter((item: GroupItem) => !action.data.group.items.includes(item.id))
    ];

    return {
      ...state,
      entries: {
        ...state.entries,
        [ action.data.group.id ]: {
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
        [ action.data.group.id ]: {
          name: action.data.group.id,
          items: []
        }
      }
    };

  case UserActionsEnum.CLEAR_ME:
    return initialState;

  default:
    return state;
  }
};

export default groupsReducer;
