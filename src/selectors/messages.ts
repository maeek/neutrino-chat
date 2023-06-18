import { createSelector } from 'reselect';
import { getStoreState } from '@/store/index';
import { Message, MessageStatus } from '@/store/messages/types';

export const getMessagesState = (state = getStoreState()) => state.messages;

export const getMessages = createSelector(
  getMessagesState,
  (state) => state.list
);

export const getAttachments = createSelector(
  getMessagesState,
  (state) => state.attachments
);

export const getMessageById = (id?: string) =>
  createSelector(getMessages, (messages) =>
    id ? messages[ id ] || ({} as Message) : ({} as Message)
  );

export const getMessagesList = createSelector(getMessagesState, (state) =>
  Object.values(state.list)
);

export const getMessagesByIds = (ids: string[]) =>
  createSelector(getMessages, (messages) => ids.map((msid) => messages[ msid ]));

export const getMessagesByParentId = (parentId: string) =>
  createSelector(getMessagesList, (messages) =>
    messages.filter((message) => message.parentId === parentId)
  );

export const getMessagesUnreadFromList = (list: Message[]) =>
  list.filter(
    (message) => !message.read && message.status !== MessageStatus.NOT_SENT
  );

export const getMessagesUnread = createSelector(getMessagesList, (messages) =>
  getMessagesUnreadFromList(messages)
);

export const getMessagesUnreadForParent = (parentId: string) =>
  createSelector(getMessagesByParentId(parentId), (messages) =>
    getMessagesUnreadFromList(messages)
  );

export const areMessagesUnreadByParentId = (parentId: string) =>
  createSelector(
    getMessagesByParentId(parentId),
    (messages) => ![ ...messages ].pop()?.read
  );

export const getAttachmentsByMessageId = (messageId: string) =>
  createSelector(
    getMessageById(messageId),
    getAttachments,
    (message, attachments) => message.attachments?.map((id) => attachments[ id ])
  );
