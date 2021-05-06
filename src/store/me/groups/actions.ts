import {
  AddGroupMembersAction,
  AddGroupsAction,
  ClearGroupMembersAction,
  ClearGroupsAction,
  GroupActionsEnum,
  GroupItem,
  RemoveGroupMembersAction,
  RemoveGroupsAction,
  RenameGroupAction
} from './types';

export const addGroups = (groups: string[]): AddGroupsAction => ({
  type: GroupActionsEnum.ADD_GROUP,
  data: {
    groups
  }
});

export const removeGroups = (groups: string[]): RemoveGroupsAction => ({
  type: GroupActionsEnum.REMOVE_GROUP,
  data: {
    groups
  }
});

export const clearGroups = (): ClearGroupsAction => ({
  type: GroupActionsEnum.CLEAR_GROUPS,
  data: {}
});

export const renameGroup = (id: string, name: string): RenameGroupAction => ({
  type: GroupActionsEnum.RENAME_GROUP,
  data: {
    group: {
      id,
      name
    }
  }
});

export const addMembersToGroup = (id: string, items: GroupItem[]): AddGroupMembersAction => ({
  type: GroupActionsEnum.ADD_MEMBER,
  data: {
    group: {
      id,
      items
    }
  }
});

export const removeMembersFromGroup = (id: string, items: string[]): RemoveGroupMembersAction => ({
  type: GroupActionsEnum.REMOVE_MEMBER,
  data: {
    group: {
      id,
      items
    }
  }
});

export const clearGroupMembers = (id: string): ClearGroupMembersAction => ({
  type: GroupActionsEnum.CLEAR_MEMBERS,
  data: {
    group: {
      id
    }
  }
});
