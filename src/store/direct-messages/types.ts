import { Action } from 'redux';

export interface DmsSettings {
  backgroundUri?: string
  backgroundOpacity?: number;
  backgroundBlur?: number;
  color?: string;
  blocked?: boolean;
}

export interface Dms {
  id: string;
  nickname?: string;
  settings: DmsSettings;
  messages: string[];
  createdDate: number;
  lastMessage: {
    id: string;
    content: string;
  };
  typing: boolean;
}

export interface DmsState {
  joined: string[];
  recent: string[];
  entries: {
    [key: string]: Dms
  }
}

export enum DmsActionsEnum {
  ADD_DMS = 'ADD_DMS',
  REMOVE_DMS = 'REMOVE_DMS',
  CLEAR_DMS = 'CLEAR_DMS',
  MODIFY_DMS = 'MODIFY_DMS',
  SET_DM_JOINED = 'SET_DM_JOINED',
  ADD_DM_JOINED = 'ADD_DM_JOINED',
  REMOVE_DM_JOINED = 'REMOVE_DM_JOINED',
  ADD_DM_RECENTS = 'ADD_DM_RECENTS',
  CLEAR_DM_RECENTS = 'CLEAR_DM_RECENTS',
}

export interface ModifyDmsPayload extends  Partial<Omit<Dms, 'createdDate' | 'id'>> {
  id: string;
}

export type ModifyDmsPayloadType = ModifyDmsPayload[];

export interface AddDms extends Action {
  type: DmsActionsEnum.ADD_DMS,
  data: {
    dms: Dms[]
  }
}

export interface RemoveDms extends Action {
  type: DmsActionsEnum.REMOVE_DMS,
  data: {
    ids: string[]
  }
}

export interface ClearDms extends Action {
  type: DmsActionsEnum.CLEAR_DMS,
  data: {}
}

export interface ModifyDms extends Action {
  type: DmsActionsEnum.MODIFY_DMS,
  data: {
    dms: ModifyDmsPayloadType
  }
}

export interface SetDmJoined extends Action {
  type: DmsActionsEnum.SET_DM_JOINED,
  data: {
    ids: string[];
  }
}

export interface AddDmJoined extends Action {
  type: DmsActionsEnum.ADD_DM_JOINED,
  data: {
    ids: string[];
  }
}

export interface RemoveDmJoined extends Action {
  type: DmsActionsEnum.REMOVE_DM_JOINED,
  data: {
    ids: string[];
  }
}

export interface AddDmRecents extends Action {
  type: DmsActionsEnum.ADD_DM_RECENTS,
  data: {
    ids: string[];
  }
}

export interface ClearDmRecents extends Action {
  type: DmsActionsEnum.CLEAR_DM_RECENTS,
  data: {}
}

export type DmsActions = ClearDmRecents | AddDmRecents | RemoveDmJoined | AddDmJoined | SetDmJoined
| ModifyDms | ClearDms | RemoveDms | AddDms;
