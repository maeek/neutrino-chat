import { DateTime } from 'luxon';
import { GenericPayloadStructure } from '../../types';

export interface Contact {
  username: string;
  added: DateTime;
}

export interface ContactEntry {
  [key: string]: Contact;
}

export type ContactsState = {
  entries: ContactEntry;
}

export enum ContactActionsEnum {
  ADD_CONTACT = 'ADD_CONTACT',
  REMOVE_CONTACT = 'REMOVE_CONTACT',
  CLEAR_CONTACTS = 'CLEAR_CONTACTS'
}

export interface AddContactsAction extends GenericPayloadStructure {
  type: ContactActionsEnum.ADD_CONTACT;
  data: {
    users: string[];
    timestamp: DateTime;
  }
}

export interface RemoveContactsAction extends GenericPayloadStructure {
  type: ContactActionsEnum.REMOVE_CONTACT;
  data: {
    users: string[];
  }
}

export interface ClearContactsAction extends GenericPayloadStructure {
  type: ContactActionsEnum.CLEAR_CONTACTS;
  data: {}
}

export type ContactsActionTypes = AddContactsAction | RemoveContactsAction | ClearContactsAction;
