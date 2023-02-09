import { getMessagesByParentId } from '@/selectors/messages';
import { getMeUsername } from '@/selectors/user';
import { getUsers } from '@/selectors/users';
import { MessageTypes } from '@/store/messages/types';
import { Bubble, ContextMenu } from '@maeek/neutrino-design';
import { useSelector } from 'react-redux';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticonRounded';
import { DeleteForeverRounded, MoreHorizRounded } from '@material-ui/icons';
import classNames from 'classnames';
import './chat.scss'

export interface ChatProps {
  type: MessageTypes;
  id: string;
}

export const Chat = ({ type, id }: ChatProps) => {
  const messages = useSelector(getMessagesByParentId(id)) || [];
  const myId = useSelector(getMeUsername);
  const users = useSelector(getUsers);

  console.log(messages);
  const actions = [
    {
      key: 'action-1',
      name: 'Action 1',
      icon: <InsertEmoticonIcon />,
      onClick: () => {
        console.log('action 1');
      }
    },
    {
      key: 'action-2',
      name: 'More',
      icon: <MoreHorizRounded />,
      onClick: () => {
        console.log('action 2');
      },
      children: (
        <ContextMenu items={[
          { text: 'Details' },
          { text: 'Forward' },
          { text: 'Remove', icon: <DeleteForeverRounded /> }
        ]} />
      )
    }
  ]

  return (
    <div className={classNames('chat-bubble-list', { 'chat-bubble-list--no-avatar': type === MessageTypes.DIRECT })}>
      {
        messages.map((message, i, arr) => (
          <Bubble
            actions={actions}
            key={message.uuid}
            timestamp={message.timeReceived || 0}
            sender={message.senderId}
            content={message.body}
            type={message.senderId === myId ? 'sender' : 'recipient'}
            inBulk={arr[i - 1]?.senderId === message.senderId || arr[i + 1]?.senderId === message.senderId}
            isFirstInBulk={arr[i - 1]?.senderId !== message.senderId}
            isLastInBulk={!arr[i + 1] || arr[i + 1]?.senderId !== message.senderId}
            avatar={type === MessageTypes.CHANNEL && message.senderId !== myId ? users[message.senderId].avatar : undefined}
          />
        ))
      }
    </div>
  );
};
