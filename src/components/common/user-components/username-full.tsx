import { UserStatusEnum } from '@/store/users/types';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading/Heading';
import { TextType } from '@maeek/neutrino-design/components/atoms/typography/text/Text';
import { StatusDot, StatusDotState } from '../status-dot';
import './username-full.scss';

export interface UsernameFullProps {
  id: string;
  name?: string;
  nickname?: string;
  status?: UserStatusEnum;
}

export const UsernameFull = ({ id, name, nickname, status }: UsernameFullProps) => {
  const getStatus = () => {
    switch (status) {
    case UserStatusEnum.ACTIVE:
      return 'Online';
    case UserStatusEnum.AWAY:
      return 'Away';
    case UserStatusEnum.OFFLINE:
      return 'Offline';
    default:
      return 'Unknown';
    }
  };

  const mapStatusToType = (status: 'Online' | 'Offline' | 'Away' | 'Unknown'): TextType => {
    switch (status) {
    case 'Online':
      return 'success';
    case 'Away':
      return 'warning';
    default:
      return 'secondary';
    }
  };

  const mapStatusToDotStatus = (status: 'Online' | 'Offline' | 'Away' | 'Unknown') => status.toLowerCase() as StatusDotState;

  const firstNameText = nickname ? nickname :
    name && id !== name
      ? name
      : id;

  const firstName = (
    <Text className="user-name-first">
      {firstNameText.length > 175
        ? `${firstNameText.substr(0, 175)}...`
        : firstNameText}
    </Text>
  );

  const originalName = nickname || (name && id !== name)
    ? (
      <Text type="secondary" monospace>
        @{
          id.length > 175
            ? `${id.substr(0, 175)}...`
            : id
        }
        { nickname && name && id !== name
          ? (
            <Text monospace disabled className="user-name-full"> ({
              name.length > 175
                ? `${name.substr(0, 175)}...`
                : name
            })
            </Text>
          ) : null }
      </Text>
    )
    : null;

  return (
    <Heading className="user-name" level={2}>
      {firstName}
      {originalName}
      <Text type={mapStatusToType(getStatus())} className="user-status">
        <StatusDot state={mapStatusToDotStatus(getStatus())} className="user-status-dot" />
        {getStatus()}
      </Text>
    </Heading>
  );
};

export default UsernameFull;