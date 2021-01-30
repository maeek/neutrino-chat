import { DateTime } from 'luxon';
import groupsReducer from '.';
import { addGroups, addMembersToGroup, clearGroupMembers, clearGroups, removeGroups, removeMembersToGroup } from './actions';
import { AddGroupMembersAction, AddGroupsAction, ClearGroupMembersAction, ClearGroupsAction, GroupActionsEnum, GroupItem, GroupMemebersActionTypes, Groups, GroupsActionTypes, GroupsState, RemoveGroupMembersAction, RemoveGroupsAction, RenameGroupAction } from './types';


const TIME_MOCK = '2021-01-30T18:05:38.652+01:00' as unknown as DateTime;

jest.mock('luxon', () => ({
  DateTime: {
    local: () => TIME_MOCK
  }
}));

describe('Redux store - Me/Groups', () => {
  const initState = {
    groups: {
      Starred: {
        name: 'Starred',
        items: []
      }
    }
  };

  describe('Actions', () => {
    it('should create an action to add groups', () => {
      const groups: string[] = [
        'group1',
        'group2'
      ];
      const expectedAction = {
        type: GroupActionsEnum.ADD_GROUP,
        data: {
          groups
        }
      };
      expect(addGroups(groups)).toEqual(expectedAction);
    });

    it('should create an action to remove groups', () => {
      const groups = [
        'group1',
        'group2'
      ];
      const expectedAction = {
        type: GroupActionsEnum.REMOVE_GROUP,
        data: {
          groups
        }
      };
      expect(removeGroups(groups)).toEqual(expectedAction);
    });

    it('should create an action to clear groups', () => {
      const expectedAction = {
        type: GroupActionsEnum.CLEAR_GROUPS,
        data: {}
      };
      expect(clearGroups()).toEqual(expectedAction);
    });

    it('should create an action to add members to a groups', () => {
      const id = 'Starred';
      const groups: GroupItem[] = [
        {
          id: '1',
          name: 'group1'
        },
        {
          id: '2',
          name: 'group2'
        }
      ];
      const expectedAction = {
        type: GroupActionsEnum.ADD_MEMBER,
        data: {
          group: {
            id,
            items: groups
          }
        }
      };
      expect(addMembersToGroup(id, groups)).toEqual(expectedAction);
    });

    it('should create an action to remove members to a groups', () => {
      const id = 'Starred';
      const groups: string[] = ['1', '2'];
      const expectedAction = {
        type: GroupActionsEnum.REMOVE_MEMBER,
        data: {
          group: {
            id,
            items: groups
          }
        }
      };
      expect(removeMembersToGroup(id, groups)).toEqual(expectedAction);
    });

    it('should create an action to clear members', () => {
      const id = '1';
      const expectedAction = {
        type: GroupActionsEnum.CLEAR_MEMBERS,
        data: {
          group: {
            id
          }
        }
      };
      expect(clearGroupMembers(id)).toEqual(expectedAction);
    });
  });

  describe('Reducer', () => {
    it('should initialize default state', () => {
      expect(
        groupsReducer(undefined, {} as GroupsActionTypes | GroupMemebersActionTypes)
      ).toEqual(initState);
    });

    it('should handle ADD_GROUP', () => {
      const groups = ['group1', 'group2'];
      const addAction: AddGroupsAction = {
        type: GroupActionsEnum.ADD_GROUP,
        data: {
          groups
        }
      }

      expect(
        groupsReducer(initState, addAction)
      ).toEqual({
        groups: {
          ...initState.groups,
          [groups[0]]: {
            name: groups[0],
            items: []
          },
          [groups[1]]: {
            name: groups[1],
            items: []
          }
        }
      })
    });

    it('should handle REMOVE_GROUP', () => {
      const newState: GroupsState = {
        groups: {
          ...initState.groups,
          '1': {
            name: '1',
            items: []
          },
          '2': {
            name: '2',
            items: []
          }
        }
      };

      const groups = ['1', '2'];

      const removeAction: RemoveGroupsAction = {
        type: GroupActionsEnum.REMOVE_GROUP,
        data: {
          groups
        }
      }

      expect(
        groupsReducer(newState, removeAction)
      ).toEqual(initState);
    });

    it('should handle RENAME_GROUP', () => {
      const newState: GroupsState = {
        groups: {
          ...initState.groups,
          '1': {
            name: '1',
            items: [{
              id: '1',
              name: 'channelx'
            }]
          },
          '2': {
            name: '2',
            items: []
          }
        }
      };

      const expectedState: GroupsState = {
        groups: {
          ...initState.groups,
          'test': {
            name: 'test',
            items: [{
              id: '1',
              name: 'channelx'
            }]
          },
          '2': {
            name: '2',
            items: []
          }
        }
      };

      const renameGroup: RenameGroupAction = {
        type: GroupActionsEnum.RENAME_GROUP,
        data: {
          group: {
            id: '1',
            name: 'test'
          }
        }
      }

      expect(
        groupsReducer(newState, renameGroup)
      ).toEqual(expectedState);
    });

    it('should handle CLEAR_GROUPS', () => {
      const newState: GroupsState = {
        groups: {
          ...initState.groups,
          '1': {
            name: '1',
            items: []
          },
          '2': {
            name: '2',
            items: []
          }
        }
      };

      const clearAction: ClearGroupsAction = {
        type: GroupActionsEnum.CLEAR_GROUPS,
        data: {}
      }

      expect(
        groupsReducer(newState, clearAction)
      ).toEqual(initState);
    });

    it('should handle ADD_MEMBER', () => {
      const items: GroupItem[] = [
        {
          id: '1',
          name: 'channel1'
        }
      ];
      const addAction: AddGroupMembersAction = {
        type: GroupActionsEnum.ADD_MEMBER,
        data: {
          group: {
            id: 'Starred',
            items
          }
        }
      }

      expect(
        groupsReducer(initState, addAction)
      ).toEqual({
        groups: {
          Starred: {
            name: 'Starred',
            items
          }
        }
      });
    });

    it('should handle REMOVE_MEMBER', () => {
      const removeAction: RemoveGroupMembersAction = {
        type: GroupActionsEnum.REMOVE_MEMBER,
        data: {
          group: {
            id: 'Starred',
            items: ['1']
          }
        }
      };

      const newState: GroupsState = {
        groups: {
          Starred: {
            name: 'Starred',
            items: [{
              id: '1',
              name: 'channel1'
            }]
          }
        }
      };

      expect(
        groupsReducer(newState, removeAction)
      ).toEqual({
        groups: {
          Starred: {
            name: 'Starred',
            items: []
          }
        }
      });
    });
    
    it('should handle CLEAR_MEMBERS', () => {
      const clearAction: ClearGroupMembersAction = {
        type: GroupActionsEnum.CLEAR_MEMBERS,
        data: {
          group: {
            id: 'Starred'
          }
        }
      };

      const newState: GroupsState = {
        groups: {
          Starred: {
            name: 'Starred',
            items: [
              {
                id: '1',
                name: 'channel1'
              },
              {
                id: '2',
                name: 'channel2'
              }
            ]
          }
        }
      };

      expect(
        groupsReducer(newState, clearAction)
      ).toEqual({
        groups: {
          Starred: {
            name: 'Starred',
            items: []
          }
        }
      });
    });
  });
});
