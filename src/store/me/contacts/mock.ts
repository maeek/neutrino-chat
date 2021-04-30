import { ContactsState } from './types';

export const contactsReducerMock: ContactsState = {
  entries: {
    bob: {
      username: 'bob',
      added: Date.now()
    },
    ross: {
      username: 'ross',
      added: Date.now()
    }
  }
};

export default contactsReducerMock;
