import filtersReducerMock from '@/store/app/filters/mock';
import channelsReducerMock from '@/store/channels/mock';
import contactsReducerMock from '@/store/me/contacts/mock';
import groupsReducerMock from '@/store/me/groups/mock';
import {
  getFilteredChannelsByGroup,
  getFiltersGroup,
  getFiltersMain,
  getFiltersQueries,
  getGroupByFiltersGroup
} from './filters';

describe('Filters', () => {
  const globalStateMock = {
    app: {
      filters: filtersReducerMock
    },
    me: {
      groups: groupsReducerMock,
      contacts: contactsReducerMock
    },
    channels: channelsReducerMock
  };
  it('getFiltersMain should return selected category', () => {
    const filterMain = getFiltersMain(globalStateMock as any);
    expect(filterMain).toEqual(globalStateMock.app.filters.category);
  });

  it('getFiltersGroup should return selected group name', () => {
    const filterGroup = getFiltersGroup(globalStateMock as any);
    expect(filterGroup).toEqual(globalStateMock.app.filters.group);
  });

  it('getFiltersQueries should return selected queries', () => {
    const filterQueries = getFiltersQueries(globalStateMock as any);
    expect(filterQueries).toEqual(globalStateMock.app.filters.queries);
  });

  it.skip('getGroupByFiltersGroup should return selected group', () => {
    const filterQueries = getGroupByFiltersGroup(globalStateMock as any);
    expect(filterQueries).toEqual(globalStateMock.me.groups.entries.Starred);
  });

  it.skip('getFilteredChannelsByGroup should return selected group', () => {
    const filterQueries = getFilteredChannelsByGroup(globalStateMock as any);
    expect(filterQueries).toEqual([ globalStateMock.channels.entries[ '0f717b7f-fbf8-47a7-ae8c-778d8889406a' ] ]);
  });
});
