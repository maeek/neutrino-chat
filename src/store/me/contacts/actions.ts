import { DateTime } from 'luxon';
import { AddContactsAction, ClearContactsAction, ContactActionsEnum, RemoveContactsAction } from './types';

export const addToContacts = (users: string[]): AddContactsAction => ({
  type: ContactActionsEnum.ADD_CONTACT,
  data: {
    users,
    timestamp: DateTime.local()
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
