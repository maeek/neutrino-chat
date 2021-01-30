import { DateTime } from 'luxon';
import contactsReducer from '.';
import { addToContacts, clearContacts, removeFromContacts } from './actions';
import { AddContactsAction, ClearContactsAction, ContactActionsEnum, ContactsActionTypes, ContactsState, RemoveContactsAction } from './types';

const TIME_MOCK = '2021-01-30T18:05:38.652+01:00' as unknown as DateTime;

jest.mock('luxon', () => ({
  DateTime: {
    local: () => TIME_MOCK
  }
}));

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
          users
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
        contacts: {}
      })
    });

    it('should handle ADD_CONTACT', () => {
      const users = [
        'test1',
        'test2'
      ];
      const addAction: AddContactsAction = {
        type: ContactActionsEnum.ADD_CONTACT,
        data: {
          users
        }
      }

      expect(
        contactsReducer({contacts: {}}, addAction)
      ).toEqual({
        contacts: {
          test1: {
            username: 'test1',
            added: TIME_MOCK
          },
          test2: {
            username: 'test2',
            added: TIME_MOCK
          }
        }
      })
    });

    it('should handle REMOVE_CONTACT', () => {
      const initState: ContactsState = {
        contacts: {
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
      }

      expect(
        contactsReducer(initState, removeAction)
      ).toEqual({
        contacts: {}
      })
    });

    it('should handle CLEAR_CONTACTS', () => {
      const clearAction: ClearContactsAction = {
        type: ContactActionsEnum.CLEAR_CONTACTS,
        data: {}
      }
      const initialState: ContactsState = {
        contacts: {
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
        contacts: {}
      })
    });
    
  });
});
