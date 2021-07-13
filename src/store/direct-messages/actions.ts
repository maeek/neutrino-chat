import { ActionCreator } from 'redux';
import { AddDmJoined, AddDmRecents, AddDms, ClearDmRecents, ClearDms, Dms, DmsActionsEnum, ModifyDms, ModifyDmsPayloadType, RemoveDmJoined, RemoveDms, SetDmJoined } from './types';

export const addDms: ActionCreator<AddDms> = (dms: Dms[]) => ({
  type: DmsActionsEnum.ADD_DMS,
  data: {
    dms
  }
});

export const removeDms: ActionCreator<RemoveDms> = (ids: string[]) => ({
  type: DmsActionsEnum.REMOVE_DMS,
  data: {
    ids
  }
});

export const clearDms: ActionCreator<ClearDms> = () => ({
  type: DmsActionsEnum.CLEAR_DMS,
  data: {}
});

export const modifyDms: ActionCreator<ModifyDms> = (dms: ModifyDmsPayloadType) => ({
  type: DmsActionsEnum.MODIFY_DMS,
  data: {
    dms
  }
});

export const setDmJoined: ActionCreator<SetDmJoined> = (ids: string[]) => ({
  type: DmsActionsEnum.SET_DM_JOINED,
  data: {
    ids
  }
});

export const addDmJoined: ActionCreator<AddDmJoined> = (ids: string[]) => ({
  type: DmsActionsEnum.ADD_DM_JOINED,
  data: {
    ids
  }
});

export const removeDmJoined: ActionCreator<RemoveDmJoined> = (ids: string[]) => ({
  type: DmsActionsEnum.REMOVE_DM_JOINED,
  data: {
    ids
  }
});

export const addDmRecents: ActionCreator<AddDmRecents> = (ids: string[]) => ({
  type: DmsActionsEnum.ADD_DM_RECENTS,
  data: {
    ids
  }
});

export const clearDmRecents: ActionCreator<ClearDmRecents> = () => ({
  type: DmsActionsEnum.CLEAR_DM_RECENTS,
  data: {}
});
