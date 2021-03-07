import { GenericPayloadStructure } from '../../types';

export interface GroupItem {
  id: string;
  name: string;
}

export interface Groups {
  name: string;
  items: GroupItem[];
}

export interface GroupsEntry {
  [key: string]: Groups;
}

export type GroupsState = {
  entries: GroupsEntry;
}

export enum GroupActionsEnum {
  ADD_GROUP = 'ADD_GROUP',
  RENAME_GROUP = 'RENAME_GROUP',
  REMOVE_GROUP = 'REMOVE_GROUP',
  CLEAR_GROUPS = 'CLEAR_GROUPS',
  ADD_MEMBER = 'ADD_MEMBER',
  REMOVE_MEMBER = 'REMOVE_MEMBER',
  CLEAR_MEMBERS = 'CLEAR_MEMBERS'
}

export interface AddGroupsAction extends GenericPayloadStructure {
  type: GroupActionsEnum.ADD_GROUP;
  data: {
    groups: string[];
  }
}

export interface RemoveGroupsAction extends GenericPayloadStructure {
  type: GroupActionsEnum.REMOVE_GROUP;
  data: {
    groups: string[];
  }
}

export interface ClearGroupsAction extends GenericPayloadStructure {
  type: GroupActionsEnum.CLEAR_GROUPS;
  data: {}
}

export interface RenameGroupAction extends GenericPayloadStructure {
  type: GroupActionsEnum.RENAME_GROUP;
  data: {
    group: {
      id: string;
      name: string;
    }
  }
}

export interface AddGroupMembersAction extends GenericPayloadStructure {
  type: GroupActionsEnum.ADD_MEMBER;
  data: {
    group: {
      id: string;
      items: GroupItem[];
    }
  }
}

export interface RemoveGroupMembersAction extends GenericPayloadStructure {
  type: GroupActionsEnum.REMOVE_MEMBER;
  data: {
    group: {
      id: string;
      items: string[];
    }
  }
}

export interface ClearGroupMembersAction extends GenericPayloadStructure {
  type: GroupActionsEnum.CLEAR_MEMBERS;
  data: {
    group: {
      id: string;
    }
  }
}

export type GroupsActionTypes = AddGroupsAction
  | RemoveGroupsAction
  | ClearGroupsAction
  | RenameGroupAction;

export type GroupMemebersActionTypes = AddGroupMembersAction
  | RemoveGroupMembersAction
  | ClearGroupMembersAction;
