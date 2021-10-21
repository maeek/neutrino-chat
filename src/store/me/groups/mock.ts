import { GroupsState, GroupTypeEnum } from './types';

export const groupsReducerMock: GroupsState = {
  entries: {
    Starred: {
      name: 'Starred',
      items: [
        {
          id: '0f717b7f-fbf8-47a7-ae8c-778d8889406a',
          type: GroupTypeEnum.CHANNEL
        },
        {
          id: 'bob',
          type: GroupTypeEnum.USER
        },
        {
          id: 'bobandy',
          type: GroupTypeEnum.USER
        }
      ]
    },
    Friends: {
      name: 'Friends',
      items: [
        {
          id: '0f717b7f-fbf8-47a7-ae8c-778d8889406a',
          type: GroupTypeEnum.CHANNEL
        }
      ]
    },
    ...(Object.fromEntries(new Array(50).fill(null).map((_e, i) => ([ `TestGroup-${i}`, {
      name: `TestGroup-${i}`,
      items: []
    } ]))))
  }
};

export default groupsReducerMock;
