import {
  NotificationsRounded,
  AccountCircleRounded,
  SettingsApplicationsRounded,
  VisibilityRounded,
  LockRounded
} from '@material-ui/icons';

export enum SettingsCategoriesEnum {
  Profile = 'profile',
  Security = 'security',
  Notifications = 'notifications',
  ServerMgmt = 'server',
  Audit = 'audit'
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
      name: 'Security',
      node: null,
      category: SettingsCategoriesEnum.Security,
      icon: <LockRounded />
    },
    {
      name: 'Server Management',
      node: null,
      category: SettingsCategoriesEnum.ServerMgmt,
      icon: <SettingsApplicationsRounded />,
      adminOnly: true
    },
    {
      name: 'Audit',
      node: null,
      category: SettingsCategoriesEnum.Audit,
      icon: <VisibilityRounded />,
      adminOnly: true
    }
  ]
};
