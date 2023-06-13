import { Message } from '@/store/messages/types';
import { useSelector } from 'react-redux';
import { getAttachmentsByMessageId } from '@/selectors/messages';
import './content.scss';

export interface ChatBubbleAttachmentProps {
  message: Message;
  onClick: () => void;
}

export const ChatBubbleAttachment = ({
  message,
  onClick
}: ChatBubbleAttachmentProps) => {
  const attachments = useSelector(getAttachmentsByMessageId(message.uuid));

  return (
    <div className='chat-bubble-content'>
      {attachments.map((attachment) => (
        <div
          className='chat-bubble-content-renderer'
          onClick={onClick}
          key={attachment.uuid}
        >
          {attachment.mimeType.startsWith('image/') && (
            <img src={attachment.uri} alt={attachment.name} />
          )}
        </div>
      ))}
      {message.body}
    </div>
  );
};
