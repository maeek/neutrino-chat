import { goBack, goForward, pushLocation, replaceLocation, setHistory, updateIndex } from './actions';
import { HistoryActionsEnum } from './types';

describe('Redux store - history', () => {
  describe('Actions', () => {
    it('should create an action update index', () => {
      const index = 0;

      const expectedAction = {
        type: HistoryActionsEnum.UPDATE_INDEX,
        data: {
          index
        }
      };
      expect(updateIndex(index)).toEqual(expectedAction);
    });

    it('should create an action to go back', () => {
      const expectedAction = {
        type: HistoryActionsEnum.GO_BACK,
        data: {}
      };
      expect(goBack()).toEqual(expectedAction);
    });

    it('should create an action to go forward', () => {
      const expectedAction = {
        type: HistoryActionsEnum.GO_FORWARD,
        data: {}
      };
      expect(goForward()).toEqual(expectedAction);
    });

    it('should create an action replace location', () => {
      const pathname = '/path';

      const expectedAction = {
        type: HistoryActionsEnum.REPLACE_LOCATION,
        data: {
          pathname
        }
      };
      expect(replaceLocation(pathname)).toEqual(expectedAction);
    });

    it('should create an action push location', () => {
      const id = 1;
      const pathname = '/path';

      const expectedAction = {
        type: HistoryActionsEnum.PUSH_LOCATION,
        data: {
          id,
          pathname
        }
      };
      expect(pushLocation(pathname, id)).toEqual(expectedAction);
    });

    it('should create an action history', () => {
      const history = {
        currentIndex: 1,
        stack: [
          {
            id: 0,
            pathname: '/test'
          },
          {
            id: 1,
            pathname: '/next'
          }
        ]
      };

      const expectedAction = {
        type: HistoryActionsEnum.SET_HISTORY,
        data: {
          history
        }
      };
      expect(setHistory(history)).toEqual(expectedAction);
    });
  });
});
