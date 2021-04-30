import contactsReducer from '.';
import { TIME_MOCK } from '../../../setup-tests';
import { addToContacts, clearContacts, removeFromContacts } from './actions';
import { getContacts, getMutualContacts } from '../../../selectors/contacts';
import { AddContactsAction, ClearContactsAction, ContactActionsEnum, ContactsActionTypes, ContactsState, RemoveContactsAction } from './types';

describe('Redux store - Me/Contacts', () => {
  describe('Actions', () => {

    it('should create an action to add users to contacts', () => {
      const users = [
        'test1',
        'test2'
      ];
      const expectedAction = {
        type: ContactActionsEnum.ADD_CONTACT,
        data: {
          users,
          timestamp: TIME_MOCK
        }
      };
      expect(addToContacts(users)).toEqual(expectedAction);
    });

    it('should create an action to remove users to contacts', () => {
      const users = [
        'test1',
        'test2'
      ];
      const expectedAction = {
        type: ContactActionsEnum.REMOVE_CONTACT,
        data: {
          users
        }
      };
      expect(removeFromContacts(users)).toEqual(expectedAction);
    });

    it('should create an action to clear contacts', () => {
      const expectedAction = {
        type: ContactActionsEnum.CLEAR_CONTACTS,
        data: {}
      };
      expect(clearContacts()).toEqual(expectedAction);
    });
  });

  describe('Reducer', () => {
    it('should initialize default state', () => {
      expect(
        contactsReducer(undefined, {} as ContactsActionTypes)
      ).toEqual({
        entries: {}
      });
    });

    it('should handle ADD_CONTACT', () => {
      const users = [
        'test1',
        'test2'
      ];
      const addAction: AddContactsAction = {
        type: ContactActionsEnum.ADD_CONTACT,
        data: {
          users,
          timestamp: TIME_MOCK
        }
      };

      expect(
        contactsReducer({entries: {}}, addAction)
      ).toEqual({
        entries: {
          test1: {
            username: 'test1',
            added: TIME_MOCK
          },
          test2: {
            username: 'test2',
            added: TIME_MOCK
          }
        }
      });
    });

    it('should handle REMOVE_CONTACT', () => {
      const initState: ContactsState = {
        entries: {
          test1: {
            username: 'test1',
            added: TIME_MOCK
          },
          test2: {
            username: 'test2',
            added: TIME_MOCK
          }
        }
      };

      const users = [
        'test1',
        'test2'
      ];

      const removeAction: RemoveContactsAction = {
        type: ContactActionsEnum.REMOVE_CONTACT,
        data: {
          users
        }
      };

      expect(
        contactsReducer(initState, removeAction)
      ).toEqual({
        entries: {}
      });
    });

    it('should handle CLEAR_CONTACTS', () => {
      const clearAction: ClearContactsAction = {
        type: ContactActionsEnum.CLEAR_CONTACTS,
        data: {}
      };
      const initialState: ContactsState = {
        entries: {
          test1: {
            username: 'test1',
            added: TIME_MOCK
          },
          test2: {
            username: 'test2',
            added: TIME_MOCK
          }
        }
      };
      expect(
        contactsReducer(initialState, clearAction)
      ).toEqual({
        entries: {}
      });
    });
    
  });

  describe('Selectots', () => {
    const globalStateMock = {
      me: {
        contacts: {
          entries: {
            foobar: {
              username: 'foobar',
              added: TIME_MOCK
            },
            fizbuzz: {
              username: 'fizbuzz',
              added: TIME_MOCK
            }
          }
        }
      }
    };

    it('getContact should return all contacts from global store', () => {
      const contacts = getContacts(globalStateMock as any);
      expect(contacts).toEqual(globalStateMock.me.contacts.entries);
    });
    it.skip('getMutualContacts from global store', () => {
      const contacts = getMutualContacts(globalStateMock as any);
      expect(contacts).toEqual([]);
    });
  });
});
