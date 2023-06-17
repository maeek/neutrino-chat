import { ReactNode } from 'react';
import { Heading } from '@maeek/neutrino-design/components/typography/heading/Heading';
import { Text } from '@maeek/neutrino-design/components/typography/text/Text';
import './username-full.scss';

export interface UsernameFullProps {
  id: string;
  name?: string;
  nickname?: ReactNode;
}

export const UsernameFull = ({ id, name, nickname }: UsernameFullProps) => {
  const firstNameText = nickname ? nickname : id;

  const firstName = <Text className='user-name-first'>{firstNameText}</Text>;

  const originalName =
    nickname || (name && id !== name) ? (
      <Text type='secondary' monospace className='user-name-at'>
        @{id}
      </Text>
    ) : null;

  return (
    <Heading className='user-name' level={2}>
      {firstName}
      {originalName}
    </Heading>
  );
};

export default UsernameFull;
