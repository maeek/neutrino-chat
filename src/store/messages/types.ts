import { Action } from 'redux';

export enum MessageTypes {
  DIRECT = 'DIRECT',
  CHANNEL = 'CHANNEL'
}

export interface MessageReactions {
  uuid: string;
  content: string; // utf-8 emoji
  userId: string;
}

export enum MessageStatus {
  NOT_SENT = 0,
  SENT = 1,
  DELIVERED = 2,
  FAILED = 3,
  REMOVED = 4
}

export interface Message {
  uuid: string;
  type: MessageTypes;
  status: MessageStatus;
  senderId: string;
  parentId: string;
  timeReceived?: number;
  timeSent?: number;
  body?: string;
  mentions?: string[];
  reactions?: MessageReactions[];
  attachments: string[];
  read?: boolean;
}

export interface Attachment {
  uuid: string;
  name: string;
  uri: string;
  mimeType: string;
  size: number; // in bytes
}

interface AttachmentImage {
  width: number;
  height: number;
}

interface AttachmentAudio {
  duration: number;
}

type AttachmentVideo = Partial<AttachmentImage> & Partial<AttachmentAudio>;

export type AttachmentType = (
  Partial<AttachmentVideo> | Partial<AttachmentImage> | Partial<AttachmentAudio>
) & Attachment;

export interface MessagesState {
  messages: {
    [uuid: string]: Message;
  };
  attachments: {
    [uuid: string]: AttachmentType;
  };
}

export enum MessagesActionsEnum {
  ADD_MESSAGES = 'ADD_MESSAGES',
  REMOVE_MESSAGES = 'REMOVE_MESSAGES',
  MODIFY_MESSAGE = 'MODIFY_MESSAGE',
  ADD_ATTACHMENTS = 'ADD_ATTACHMENTS',
  REMOVE_ATTACHMENTS = 'REMOVE_ATTACHMENTS',
  UPDATE_MESSAGE_STATUS = 'UPDATE_MESSAGE_STATUS',
  ADD_MESSAGE_REACTIONS = 'ADD_MESSAGE_REACTIONS',
  REMOVE_MESSAGE_REACTIONS = 'REMOVE_MESSAGE_REACTIONS'
}

export interface AddMessages extends Action<MessagesActionsEnum.ADD_MESSAGES> {
  data: {
    messages: Message[];
    attachments?: Attachment[];
  }
}

export interface AddAttachemnts extends Action<MessagesActionsEnum.ADD_ATTACHMENTS> {
  data: {
    messageId: string;
    attachments: Attachment[];
  }
}

export interface RemoveMessages extends Action<MessagesActionsEnum.REMOVE_MESSAGES> {
  data: {
    ids: string[];
  }
}

export interface RemoveAttachments extends Action<MessagesActionsEnum.REMOVE_ATTACHMENTS> {
  data: {
    messageId: string;
    ids: string[];
  }
}

export interface ModifyMessage extends Action<MessagesActionsEnum.MODIFY_MESSAGE> {
  data: { uuid: string } & Partial<Message>;
}

export interface UpdateMessageStatus extends Action<MessagesActionsEnum.UPDATE_MESSAGE_STATUS> {
  data: {
    messageId: string;
    status: MessageStatus;
  };
}

export interface AddMessageReactions extends Action<MessagesActionsEnum.ADD_MESSAGE_REACTIONS> {
  data: {
    messageId: string;
    reactions: MessageReactions[];
  };
}

export interface RemoveMessageReactions extends Action<MessagesActionsEnum.REMOVE_MESSAGE_REACTIONS> {
  data: {
    messageId: string;
    reactionsIds: string[];
  };
}

export type MessagesActionsType = AddMessages | RemoveMessages | AddAttachemnts | RemoveAttachments | ModifyMessage
| UpdateMessageStatus | AddMessageReactions | RemoveMessageReactions;
