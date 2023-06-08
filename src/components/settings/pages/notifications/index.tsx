import SettingsPageTemplate from '../settings-page-template';
import { NotfSection } from './notf-section';
import './notifications.scss';

export const SettingsNotifications = () => {
  return (
    <SettingsPageTemplate name="Notifications Settings" className="settings-page-notifications">
      <NotfSection
        title="Chats"
        field="chats"
        description="Receive notifications for new direct messages and group messages"
      />
      <NotfSection
        title="Mentions"
        field="mentions"
        description="Receive notifications for mentions"
      />
      {/* <NotfSection
        title="Reactions"
        field="reactions"
        description="Receive notifications for when people react to messages"
      /> */}
      <NotfSection
        title="Joined"
        field="joined"
        description="Receive notifications for when people join your channels"
      />
      <NotfSection
        title="Left"
        field="left"
        description="Receive notifications for when people leave your channels"
      />
      <NotfSection
        title="Invites"
        field="groupInvites"
        description="Receive notifications for when people invite you to channels"
      />
    </SettingsPageTemplate>
  );
};

export default SettingsNotifications;
