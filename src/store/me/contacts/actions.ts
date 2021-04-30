import { AddContactsAction, ClearContactsAction, ContactActionsEnum, RemoveContactsAction } from './types';

export const addToContacts = (users: string[], timestamp = Date.now()): AddContactsAction => ({
  type: ContactActionsEnum.ADD_CONTACT,
  data: {
    users,
    timestamp
  }
});

export const removeFromContacts = (users: string[]): RemoveContactsAction => ({
  type: ContactActionsEnum.REMOVE_CONTACT,
  data: {
    users
  }
});

export const clearContacts = (): ClearContactsAction => ({
  type: ContactActionsEnum.CLEAR_CONTACTS,
  data: {}
});
