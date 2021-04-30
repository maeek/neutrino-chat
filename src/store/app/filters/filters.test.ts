import filtersReducer from '.';
import { setFilterCust, setFilterGroup, setFilterMain } from './actions';
import { FilterCategory, FiltersAction, FiltersActionsEnum, SetFilterCustom, SetFilterGroup, SetFilterMain } from './types';

describe('Redux store - App/Filters', () => {
  describe('Actions', () => {
    it('should create an action to set category', () => {
      const expectedAction = {
        type: FiltersActionsEnum.SET_FILTER_MAIN,
        data: {
          category: FilterCategory.CHANNEL
        }
      };
      expect(setFilterMain(FilterCategory.CHANNEL)).toEqual(expectedAction);
    });

    it('should create an action to set group', () => {
      const expectedAction = {
        type: FiltersActionsEnum.SET_FILTER_GROUP,
        data: {
          group: 'Starred'
        }
      };
      expect(setFilterGroup('Starred')).toEqual(expectedAction);
    });

    it('should create an action to set query', () => {
      const queries = [{
        fieldName: 'name',
        value: 'test'
      }];
      const expectedAction = {
        type: FiltersActionsEnum.SET_FILTER_CUST,
        data: {
          filters: queries
        }
      };
      expect(setFilterCust(queries)).toEqual(expectedAction);
    });
  });

  describe('Reducer', () => {
    it('should initialize default state', () => {
      expect(
        filtersReducer(undefined, {} as FiltersAction)
      ).toEqual({
        category: FilterCategory.ALL,
        group: '',
        queries: []
      });
    });

    it('should handle SET_FILTER_MAIN', () => {
      const category = FilterCategory.CONTACT;
      const action: SetFilterMain = {
        type: FiltersActionsEnum.SET_FILTER_MAIN,
        data: {
          category
        }
      };

      expect(filtersReducer(undefined, action)).toEqual({
        category,
        group: '',
        queries: []
      });
    });

    it('should handle SET_FILTER_GROUP', () => {
      const group = 'Starred';
      const action: SetFilterGroup = {
        type: FiltersActionsEnum.SET_FILTER_GROUP,
        data: {
          group
        }
      };

      expect(filtersReducer(undefined, action)).toEqual({
        category: FilterCategory.ALL,
        group,
        queries: []
      });
    });

    it('should handle SET_FILTER_CUST', () => {
      const queries = [{
        fieldName: 'name',
        value: 'test'
      }];
      const action: SetFilterCustom = {
        type: FiltersActionsEnum.SET_FILTER_CUST,
        data: {
          filters: queries
        }
      };

      expect(filtersReducer(undefined, action)).toEqual({
        category: FilterCategory.ALL,
        group: '',
        queries
      });
    });
  });
});
