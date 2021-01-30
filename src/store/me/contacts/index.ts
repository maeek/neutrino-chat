import { ContactActionsEnum, ContactEntry, ContactsActionTypes, ContactsState } from './types';
import { DateTime } from 'luxon';

export const initialState: ContactsState = {
  contacts: {}
};

const contactsReducer = (state = initialState, action: ContactsActionTypes) => {
  switch (action.type) {
    case ContactActionsEnum.ADD_CONTACT:
      const newContacts: ContactEntry = {};

      action.data.users.forEach((user: string) => {
        newContacts[user] = {
          username: user,
          added: DateTime.local()
        }
      });

      return {
        contacts: {
          ...state.contacts,
          ...newContacts
        }
      };

    case ContactActionsEnum.REMOVE_CONTACT:
      const updatedContacts = {...state.contacts};

      action.data.users.forEach((user: string) => {
        delete updatedContacts[user];
      });

      return {
        contacts: updatedContacts
      }

    case ContactActionsEnum.CLEAR_CONTACTS:
      return initialState;

    default:
      return state;
  }
};

export default contactsReducer;
export { addToContacts, removeFromContacts } from './actions';
