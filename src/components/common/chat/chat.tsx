import { getMessagesByParentId } from '@/selectors/messages';
import { getMeUsername } from '@/selectors/user';
import { getUsers } from '@/selectors/users';
import { MessageTypes } from '@/store/messages/types';
import { Bubble, ContextMenu } from '@maeek/neutrino-design';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteForeverRounded, MoreHorizRounded } from '@material-ui/icons';
import classNames from 'classnames';
import './chat.scss';
import { useEffect, useState } from 'react';
import { modifyMessage, removeMessages } from '@/store/messages/actions';
import { ChatBubbleAttachment } from './renderers/content';

export interface ChatProps {
  type: MessageTypes;
  parentId: string;
}

export const Chat = ({ type, parentId }: ChatProps) => {
  const [hasFocus, setHasFocus] = useState(true);
  const messages = useSelector(getMessagesByParentId(parentId)) || [];
  const myId = useSelector(getMeUsername);
  const users = useSelector(getUsers);
  const dispatch = useDispatch();

  const actions = [
    {
      key: 'action-1',
      name: 'More',
      icon: <MoreHorizRounded />,
      onClick: () => {},
      children: (
        <ContextMenu
          items={[
            // { text: 'Details' },
            // { text: 'Forward' },
            { text: 'Remove', icon: <DeleteForeverRounded /> }
          ]}
        />
      )
    }
  ];

  useEffect(() => {
    const unreadMessages = messages.filter((m) => !m.read);

    if (
      unreadMessages.length > 0 &&
      unreadMessages[0].senderId !== myId &&
      hasFocus
    ) {
      unreadMessages.forEach((m) => {
        dispatch(
          modifyMessage({
            ...m,
            read: true
          })
        );
      });
    }
  }, [messages, hasFocus, dispatch, myId]);

  useEffect(() => {
    const handleFocus = () => setHasFocus(true);
    const handleBlur = () => setHasFocus(false);
    const abortController = new AbortController();

    window.addEventListener('focus', handleFocus, {
      signal: abortController.signal
    });
    window.addEventListener('blur', handleBlur, {
      signal: abortController.signal
    });

    return () => abortController.abort();
  }, []);

  return (
    <div
      className={classNames('chat-bubble-list', {
        'chat-bubble-list--no-avatar': type === MessageTypes.DIRECT
      })}
    >
      {messages.map((message, i, arr) => (
        <Bubble
          actions={actions}
          key={message.uuid}
          timestamp={message.timeReceived || 0}
          sender={message.senderId}
          content={
            message.attachments.length > 0 ? (
              <ChatBubbleAttachment message={message} onClick={() => {}} />
            ) : (
              message.body
            )
          }
          type={message.senderId === myId ? 'sender' : 'recipient'}
          inBulk={
            arr[i - 1]?.senderId === message.senderId ||
            arr[i + 1]?.senderId === message.senderId
          }
          isFirstInBulk={arr[i - 1]?.senderId !== message.senderId}
          isLastInBulk={
            !arr[i + 1] || arr[i + 1]?.senderId !== message.senderId
          }
          avatar={
            type === MessageTypes.CHANNEL && message.senderId !== myId
              ? users[message.senderId].avatar
              : undefined
          }
          {...(message.attachments.length > 0 && {
            attachments: message.attachments
          })}
        />
      ))}
    </div>
  );
};
