import { ActionCreator } from 'redux';
import {
  AddAttachemnts,
  AddMessageReactions,
  AddMessages,
  Attachment,
  Message,
  MessageReactions,
  MessagesActionsEnum,
  MessageStatus,
  ModifyMessage,
  RemoveAttachments,
  RemoveMessageReactions,
  RemoveMessages,
  UpdateMessageStatus
} from './types';

export const addMessages: ActionCreator<AddMessages> = (messages: Message[], attachments?: Attachment[]) => ({
  type: MessagesActionsEnum.ADD_MESSAGES,
  data: {
    messages,
    attachments
  }
});

export const removeMessages: ActionCreator<RemoveMessages> = (ids: string[]) => ({
  type: MessagesActionsEnum.REMOVE_MESSAGES,
  data: {
    ids
  }
});

export const addAttachemnts: ActionCreator<AddAttachemnts> = (messageId: string, attachments: Attachment[]) => ({
  type: MessagesActionsEnum.ADD_ATTACHMENTS,
  data: {
    messageId,
    attachments
  }
});

export const removeAttachemnts: ActionCreator<RemoveAttachments> = (messageId: string, ids: string[]) => ({
  type: MessagesActionsEnum.REMOVE_ATTACHMENTS,
  data: {
    messageId,
    ids
  }
});

export const modifyMessage: ActionCreator<ModifyMessage> = (message: Message) => ({
  type: MessagesActionsEnum.MODIFY_MESSAGE,
  data: message
});

export const updateMessageStatus: ActionCreator<UpdateMessageStatus> = (messageId: string, status: MessageStatus) => ({
  type: MessagesActionsEnum.UPDATE_MESSAGE_STATUS,
  data: {
    messageId,
    status
  }
});

export const addMessageReactions: ActionCreator<AddMessageReactions> = (
  messageId: string,
  reactions: MessageReactions[]
) => ({
  type: MessagesActionsEnum.ADD_MESSAGE_REACTIONS,
  data: {
    messageId,
    reactions
  }
});

export const removeMessageReactions: ActionCreator<RemoveMessageReactions> = (
  messageId: string,
  reactionsIds: string[]
) => ({
  type: MessagesActionsEnum.REMOVE_MESSAGE_REACTIONS,
  data: {
    messageId,
    reactionsIds
  }
});
