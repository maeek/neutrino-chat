import {
  DoneAllRounded,
  ForumRounded,
  SendRounded,
  HowToRegRounded,
  CenterFocusStrongRounded,
  PublicRounded,
  BlockRounded
} from '@material-ui/icons';
import { FilterCategory } from '@/store/app/filters/types';
import { ReactNode } from 'react';

export const sideNavConfig = {
  mainSection: [
    {
      name: 'All',
      category: FilterCategory.ALL,
      node: null,
      icon: <DoneAllRounded />,
      action: () => null
    },
    {
      name: 'Direct Messages',
      category: FilterCategory.USER,
      node: null,
      icon: <SendRounded />,
      action: () => null
    }
    // {
    //   name: 'Channels',
    //   category: FilterCategory.CHANNEL,
    //   node: null,
    //   icon: <ForumRounded />,
    //   action: () => null
    // }
  ],
  filtersSection: [
    {
      name: 'Blocked',
      node: null,
      icon: <BlockRounded />,
      action: () => null
    }
    // {
    //   name: 'My Channels',
    //   node: null,
    //   icon: <HowToRegRounded />,
    //   action: () => null
    // },
    // {
    //   name: 'Not Empty',
    //   node: null,
    //   icon: <CenterFocusStrongRounded />,
    //   action: () => null
    // },
    // {
    //   name: 'Public',
    //   node: null,
    //   icon: <PublicRounded />,
    //   action: () => null
    // }
  ] as {
    name: string;
    node: ReactNode;
    icon: ReactNode;
    action: Function;
  }[]
};
