import { getStoreState } from '../..';

export const getContacts = (state = getStoreState()) => {
  return state.me.contacts.entries;
};

export const getMutualContacts = (state = getStoreState()) => {};
