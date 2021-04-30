import { getContacts, getMutualContacts } from './contacts';

describe('Contacts', () => {
  const globalStateMock = {
    me: {
      contacts: {
        entries: {
          foobar: {
            username: 'foobar',
            added: 123456789
          },
          fizbuzz: {
            username: 'fizbuzz',
            added: 123456789
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
