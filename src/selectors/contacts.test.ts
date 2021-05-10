import { GroupTypeEnum } from '@/store/me/groups/types';
import { getContactById, getContactIsInStarred, getContacts, getContactsIds, getMutualContacts } from './contacts';

describe('Contacts', () => {
  const globalStateMock = {
    me: {
      groups: {
        entries: {
          Starred: {
            name: 'Starred',
            items: [ {
              id: 'foobar',
              type: GroupTypeEnum.CONTACT
            } ]
          }
        }
      },
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

  it('getContactsIds should return all contacts ids from global store', () => {
    const contacts = getContactsIds(globalStateMock as any);
    expect(contacts).toEqual(Object.keys(globalStateMock.me.contacts.entries));
  });

  it('getContactById should return contact from global store', () => {
    const contacts = getContactById('foobar')(globalStateMock as any);
    expect(contacts).toEqual(globalStateMock.me.contacts.entries.foobar);
  });

  it('getContactIsInStarred should return contacts that are starred from global store', () => {
    const contacts = getContactIsInStarred('foobar')(globalStateMock as any);
    expect(contacts).toEqual(true);
  });
  it.skip('getMutualContacts from global store', () => {
    const contacts = getMutualContacts(globalStateMock as any);
    expect(contacts).toEqual([]);
  });
});
