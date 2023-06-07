import {
  VerifiedUserRounded,
  NotificationsRounded,
  AccountCircleRounded
} from '@material-ui/icons';

export enum SettingsCategoriesEnum {
  Profile = 'profile',
  Security = 'security',
  Notifications = 'notifications',
  Appearance = 'appearance',
  Chats = 'chats'
}

export const sideNavConfig = {
  mainSection: [
    {
      name: 'Profile',
      node: null,
      category: SettingsCategoriesEnum.Profile,
      icon: <AccountCircleRounded />
    },
    {
      name: 'Notifications',
      node: null,
      category: SettingsCategoriesEnum.Notifications,
      icon: <NotificationsRounded />
    },
    {
      name: 'Sessions',
      node: null,
      category: SettingsCategoriesEnum.Security,
      icon: <VerifiedUserRounded />
    }
  ]
};
