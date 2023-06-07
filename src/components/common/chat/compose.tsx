import { getMeColor, getMeUsername } from '@/selectors/user';
import { Message, MessageStatus, MessageTypes } from '@/store/messages/types';
import { ActionButton } from '@maeek/neutrino-design';
import { useAccessibility } from '@maeek/neutrino-design';
import Input, {
  InputRef
} from '@maeek/neutrino-design/components/inputs/text/Input';
import { AttachFileRounded, SendRounded } from '@material-ui/icons';
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  FocusEvent,
  KeyboardEvent
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessages } from '@/store/messages/actions';
import { v4 } from 'uuid';
import classNames from 'classnames';
import './compose.scss';

export interface ComposeMessageProps {
  type: MessageTypes;
  parentId: string;
  toggleVisibility?: () => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isMinified?: boolean;
  showActions?: boolean;
}

export const ComposeMessage = forwardRef(
  (
    {
      type,
      parentId,
      isMinified,
      toggleVisibility,
      showActions,
      onFocus,
      placeholder
    }: ComposeMessageProps,
    ref: any
  ) => {
    const meColor = useSelector(getMeColor);
    const me = useSelector(getMeUsername);
    const { onEnter } = useAccessibility();
    const inputRef = useRef<InputRef>(null);
    const dispatch = useDispatch();
    const [message, setMessage] = useState<string>('');

    useImperativeHandle(ref, () => inputRef.current);

    const onSend = () => {
      if (message.length > 0) {
        const msg: Message = {
          parentId,
          type,
          body: message,
          timeSent: Date.now(),
          status: MessageStatus.NOT_SENT,
          senderId: me,
          uuid: v4(),
          attachments: []
        };
        dispatch(addMessages([msg]));
        inputRef.current?.setValue('');
      }
    };

    return (
      <div
        className={classNames(
          'chat-compose',
          isMinified && 'chat-compose--fixed'
        )}
      >
        {showActions && (
          <ActionButton type='button' className='chat-compose-action--compact'>
            <AttachFileRounded />
          </ActionButton>
        )}
        <Input
          ref={inputRef}
          onChange={setMessage}
          value={message}
          onFocus={
            !isMinified
              ? (e: FocusEvent<HTMLInputElement>) => {
                  onFocus?.(e);
                  toggleVisibility?.();
                }
              : onFocus
          }
          placeholder={placeholder || 'Type a message'}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) =>
            !e.shiftKey && onEnter(onSend)(e)
          }
        />
        {message.length > 0 && (
          <ActionButton
            type='button'
            className='chat-compose-action--compact'
            style={{
              background: meColor || undefined,
              border: 'currentColor',
              color: 'currentColor'
            }}
            onClick={onSend}
          >
            <SendRounded
              style={{
                color: meColor || undefined,
                mixBlendMode: 'difference'
              }}
            />
          </ActionButton>
        )}
      </div>
    );
  }
);
