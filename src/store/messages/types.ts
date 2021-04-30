/* eslint-disable no-unused-vars */
export enum MessageTypes {
  DIRECT = 'DIRECT',
  CHANNEL = 'CHANNEL'
}

export enum MessageAttachmentsTypes {
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  OTHER = 'OTHER',
  URL = 'URL'
}

export interface MessageAttachmentsMetadata {
  name: string;
  mimeType: string;
  size: number; // in bytes
  
  width?: number;
  height?: number;

  duration?: number; // in seconds? -1 if not a video
}

export interface MessageAttachments {
  id: string;
  uri: string;
  type: MessageAttachmentsTypes;
  meta: MessageAttachmentsMetadata;
}

export interface MessageReactions {
  id: string;
  content: string; // utf-8 emoji
  userId: string;
}

export interface Message {
  id: string;
  type: MessageTypes;
  senderId: string;

  channelId?: string;
  userId?: string;

  timeSent: number;
  timeReceived: number;

  textBody: string;
  attachments: MessageAttachments;
  reactions: MessageReactions;
  mentions: string[]; 

  read: boolean;
}
