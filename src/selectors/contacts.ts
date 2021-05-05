import { getStoreState } from '@/store/index';
import { createSelector } from 'reselect';

export const getContacts = (state = getStoreState()) => {
  return state.me.contacts.entries;
};

export const getMutualContacts = (state = getStoreState()) => state;

export const getContactsIds = createSelector(
  getContacts,
  (contacts) => Object.keys(contacts)
);

export const getContactById = (id: string) => createSelector(
  getContacts,
  (contacts) => contacts[ id ]
);
