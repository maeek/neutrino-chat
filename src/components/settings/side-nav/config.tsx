import {
  VerifiedUserRounded,
  NotificationsRounded,
  AccountCircleRounded
} from '@material-ui/icons';
import BrushRoundedIcon from '@material-ui/icons/BrushRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';

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
      name: 'Security',
      node: null,
      category: SettingsCategoriesEnum.Security,
      icon: <VerifiedUserRounded />
    },
    {
      name: 'Chats',
      node: null,
      category: SettingsCategoriesEnum.Chats,
      icon: <ForumRoundedIcon />
    },
    {
      name: 'Notifications',
      node: null,
      category: SettingsCategoriesEnum.Notifications,
      icon: <NotificationsRounded />
    },
    {
      name: 'Appearance',
      node: null,
      category: SettingsCategoriesEnum.Appearance,
      icon: <BrushRoundedIcon />
    }
  ]
};
