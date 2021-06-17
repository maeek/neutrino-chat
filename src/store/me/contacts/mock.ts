import { ContactsState } from './types';

export const contactsReducerMock: ContactsState = {
  entries: {
    bob: {
      username: 'bob',
      added: Date.now()
    },
    'rossalita-antonios-gonzalez-martinez-gaworia': {
      username: 'rossalita-antonios-gonzalez-martinez-gaworia',
      added: Date.now()
    },
    j: {
      username: 'j',
      added: Date.now() - 15
    },
    andy: {
      username: 'andy',
      added: Date.now() - 15
    },
    bobandy: {
      username: 'bobandy',
      added: Date.now() - 3600
    },
    rick: {
      username: 'rick',
      added: Date.now() - 3600*5
    },
    jimmy: {
      username: 'jimmy',
      added: Date.now()
    },
    posix: {
      username: 'posix',
      added: Date.now()
    }
  }
};

export default contactsReducerMock;
