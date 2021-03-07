import { ContactActionsEnum, ContactEntry, ContactsActionTypes, ContactsState } from './types';

export const initialState: ContactsState = {
  entries: {}
};

const contactsReducer = (state = initialState, action: ContactsActionTypes) => {
  switch (action.type) {
  case ContactActionsEnum.ADD_CONTACT:
    const newContacts: ContactEntry = {};

    action.data.users.forEach((user: string) => {
      newContacts[user] = {
        username: user,
        added: action.data.timestamp
      };
    });

    return {
      entries: {
        ...state.entries,
        ...newContacts
      }
    };

  case ContactActionsEnum.REMOVE_CONTACT:
    const updatedContacts = {...state.entries};

    action.data.users.forEach((user: string) => {
      delete updatedContacts[user];
    });

    return {
      entries: updatedContacts
    };

  case ContactActionsEnum.CLEAR_CONTACTS:
    return initialState;

  default:
    return state;
  }
};

export default contactsReducer;
export { addToContacts, removeFromContacts } from './actions';
