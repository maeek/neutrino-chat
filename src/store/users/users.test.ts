import { users as usersReducer } from '.';
import { clearUsersCache, deleteUsersCache, populateUsersCache } from './actions';
import { usersReducerMock } from './mock';
import { ClearUsersCache, DeleteUsersCache, PopulateUsersCache, UsersAction, UsersActionsEnum } from './types';

describe('Redux store - Users', () => {
  describe('Actions', () => {

    it('should create an action to add users to users cache', () => {
      const users = [
        usersReducerMock.entries[ '449be3ed-88fa-4a42-9d02-4731d5ebd0a0' ],
        usersReducerMock.entries[ 'ad9ac59e-f51c-471a-b23d-0a5d74b0c580' ]
      ];
      const expectedAction = {
        type: UsersActionsEnum.USERS_CACHE,
        data: {
          users
        }
      };
      expect(populateUsersCache(users)).toEqual(expectedAction);
    });

    it('should create an action to remove users from cache', () => {
      const users = [
        '123',
        '321'
      ];
      const expectedAction = {
        type: UsersActionsEnum.USERS_DELETE,
        data: {
          users
        }
      };
      expect(deleteUsersCache(users)).toEqual(expectedAction);
    });

    it('should create an action to clear users cache', () => {
      const expectedAction = {
        type: UsersActionsEnum.USERS_CLEAR,
        data: {}
      };
      expect(clearUsersCache()).toEqual(expectedAction);
    });
  });

  describe('Reducer', () => {
    it('should initialize default state', () => {
      expect(
        usersReducer(undefined, {} as UsersAction)
      ).toEqual({
        entries: {}
      });
    });

    it('should handle USERS_CACHE', () => {
      const users = [
        usersReducerMock.entries[ '449be3ed-88fa-4a42-9d02-4731d5ebd0a0' ],
        usersReducerMock.entries[ 'ad9ac59e-f51c-471a-b23d-0a5d74b0c580' ]
      ];
      const populateCacheAction: PopulateUsersCache = {
        type: UsersActionsEnum.USERS_CACHE,
        data: {
          users
        }
      };

      expect(
        usersReducer(undefined, populateCacheAction)
      ).toEqual({
        entries: {
          '449be3ed-88fa-4a42-9d02-4731d5ebd0a0': usersReducerMock.entries[ '449be3ed-88fa-4a42-9d02-4731d5ebd0a0' ],
          'ad9ac59e-f51c-471a-b23d-0a5d74b0c580': usersReducerMock.entries[ 'ad9ac59e-f51c-471a-b23d-0a5d74b0c580' ]
        }
      });
    });

    it('should handle USERS_DELETE', () => {
      const initState = {
        entries: {
          '449be3ed-88fa-4a42-9d02-4731d5ebd0a0': usersReducerMock.entries[ '449be3ed-88fa-4a42-9d02-4731d5ebd0a0' ],
          'ad9ac59e-f51c-471a-b23d-0a5d74b0c580': usersReducerMock.entries[ 'ad9ac59e-f51c-471a-b23d-0a5d74b0c580' ]
        }
      };

      const users = [
        '449be3ed-88fa-4a42-9d02-4731d5ebd0a0',
        'ad9ac59e-f51c-471a-b23d-0a5d74b0c580'
      ];
      const populateCacheAction: DeleteUsersCache = {
        type: UsersActionsEnum.USERS_DELETE,
        data: {
          users
        }
      };

      expect(
        usersReducer(initState, populateCacheAction)
      ).toEqual({
        entries: {}
      });
    });

    it('should handle USERS_CLEAR', () => {
      const initState = {
        entries: {
          '449be3ed-88fa-4a42-9d02-4731d5ebd0a0': usersReducerMock.entries[ '449be3ed-88fa-4a42-9d02-4731d5ebd0a0' ],
          'ad9ac59e-f51c-471a-b23d-0a5d74b0c580': usersReducerMock.entries[ 'ad9ac59e-f51c-471a-b23d-0a5d74b0c580' ]
        }
      };

      const populateCacheAction: ClearUsersCache = {
        type: UsersActionsEnum.USERS_CLEAR,
        data: {}
      };

      expect(
        usersReducer(initState, populateCacheAction)
      ).toEqual({
        entries: {}
      });
    });
  });
});
