import { Attachment, Message } from '@/store/messages/types';
import { useSelector } from 'react-redux';
import { getAttachmentsByMessageId } from '@/selectors/messages';
import { SaveAltRounded } from '@material-ui/icons';
import { useState } from 'react';
import { ImagePreview } from '../../image-preview/image-preview';
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
  const [ isOpened, setIsOpened ] = useState<boolean>(false);

  const downloadAttachment = (attachment: Attachment) => {
    const link = document.createElement('a');
    link.download = attachment.name;
    link.href = attachment.uri;
    link.click();
  };

  const renderAttachment = (attachment: Attachment) => {
    if (attachment.mimeType.startsWith('image/')) {
      return (
        <>
          <img
            src={attachment.uri}
            alt={attachment.name}
            onClick={() => setIsOpened(true)}
          />
          {isOpened && (
            <ImagePreview
              url={attachment.uri}
              isOpened={isOpened}
              onClose={() => setIsOpened(false)}
            />
          )}
        </>
      );
    } else if (attachment.mimeType.startsWith('video/')) {
      return <video src={attachment.uri} controls />;
    } else if (attachment.mimeType.startsWith('audio/')) {
      return <audio src={attachment.uri} controls />;
    } else {
      return (
        <a
          onClick={() => downloadAttachment(attachment)}
          title={attachment.name}
          target='_blank'
          rel='noreferrer'
          className='attachment-download-link'
        >
          <SaveAltRounded />
          <span>{attachment.name}</span>
        </a>
      );
    }
  };

  return (
    <div className='chat-bubble-content'>
      {attachments.map((attachment) => (
        <div
          className='chat-bubble-content-renderer'
          onClick={onClick}
          key={attachment.uuid}
        >
          {renderAttachment(attachment)}
        </div>
      ))}
      {message.body}
    </div>
  );
};
