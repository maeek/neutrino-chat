import groupsReducerMock from '@/store/me/groups/mock';
import { getMeGroups, getMeGroupsList } from './groups';

describe('Groups', () => {
  const globalStateMock = {
    me: {
      groups: groupsReducerMock
    }
  };

  it('getMeGroups should return all groups', () => {
    const groups = getMeGroups(globalStateMock as any);
    expect(groups).toEqual(globalStateMock.me.groups.entries);
  });

  it('getMeGroupsList should return all groups', () => {
    const groups = getMeGroupsList(globalStateMock as any);
    expect(groups).toEqual(Object.values(globalStateMock.me.groups.entries));
  });
});
