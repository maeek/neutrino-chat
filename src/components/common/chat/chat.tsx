import { MessageTypes } from '@/store/messages/types';

export interface ChatProps {
  type: MessageTypes;
  id: string;
}

export const Chat = ({ type, id }: ChatProps) => {

  return (<div>Chat</div>);
};
