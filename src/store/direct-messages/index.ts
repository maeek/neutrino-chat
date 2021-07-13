import { Reducer } from 'redux';
import { ClearMe, UserActionsEnum } from '@/store/me/user/types';
import { dmsReducerMock } from './mock';
import { Dms, DmsActions, DmsActionsEnum, DmsState, ModifyDmsPayloadType } from './types';

export const initialState: DmsState =  __DEMO__ ? dmsReducerMock: {
  joined: [],
  recent: [],
  entries: {}
};

export const dms: Reducer<DmsState, DmsActions | ClearMe> = (state = initialState, action) => {
  switch (action.type) {

  case DmsActionsEnum.ADD_DMS:
    return {
      ...state,
      entries: {
        ...state.entries,
        ...(
          action.data.dms.length > 0
            ? Object.fromEntries(action.data.dms.map((dm) => [ dm.id, dm ]))
            : {}
        )
      }
    };

  case DmsActionsEnum.REMOVE_DMS:
    return {
      ...state,
      entries: removeEntries(state.entries, action.data.ids)
    };

  case DmsActionsEnum.MODIFY_DMS:
    return {
      ...state,
      entries: modifyEntries(state.entries, action.data.dms)
    };

  case DmsActionsEnum.CLEAR_DMS:
    return {
      ...state,
      entries: {}
    };

  case DmsActionsEnum.SET_DM_JOINED:
    return {
      ...state,
      joined: action.data.ids
    };

  case DmsActionsEnum.ADD_DM_JOINED:
    return {
      ...state,
      joined: [ ...state.joined, ...action.data.ids ]
    };

  case DmsActionsEnum.REMOVE_DM_JOINED:
    return {
      ...state,
      joined: [ ...state.joined ].filter((joined) => !action.data.ids.includes(joined))
    };

  case DmsActionsEnum.ADD_DM_RECENTS:
    return {
      ...state,
      recent: [ ...state.recent, ...action.data.ids ]
    };

  case DmsActionsEnum.CLEAR_DM_RECENTS:
    return {
      ...state,
      recent: []
    };

  case UserActionsEnum.CLEAR_ME:
    return initialState;

  default:
    return state;
  }
};

const removeEntries = (entries: { [key: string]: Dms }, ids: string[]) => {
  const result = { ...entries };

  ids.forEach((id) => {
    delete result[ id ];
  });

  return result;
};

const modifyEntries = (entries: { [key: string]: Dms; }, dms: ModifyDmsPayloadType) => {
  const result = { ...entries };
  
  dms.forEach((dm) => {
    if (!result[ dm.id ]) return;

    result[ dm.id ] = {
      ...result[ dm.id ],
      ...dm
    };
  });

  return result;
};

export default dms;
