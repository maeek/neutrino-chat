import contactsReducerMock from './mock';
import { ContactActionsEnum, ContactEntry, ContactsActionTypes, ContactsState } from './types';

export const initialState: ContactsState = __DEMO__ ? contactsReducerMock : {
  entries: {}
};

const contactsReducer = (state = initialState, action: ContactsActionTypes) => {
  const newContacts: ContactEntry = { ...state.entries };
  switch (action.type) {
  case ContactActionsEnum.ADD_CONTACT:

    action.data.users.forEach((user: string) => {
      newContacts[ user ] = {
        username: user,
        added: action.data.timestamp
      };
    });

    return {
      entries: newContacts
    };

  case ContactActionsEnum.REMOVE_CONTACT:
    action.data.users.forEach((user: string) => {
      delete newContacts[ user ];
    });

    return {
      entries: newContacts
    };

  case ContactActionsEnum.CLEAR_CONTACTS:
    return initialState;

  default:
    return state;
  }
};

export default contactsReducer;
export { addToContacts, removeFromContacts } from './actions';
