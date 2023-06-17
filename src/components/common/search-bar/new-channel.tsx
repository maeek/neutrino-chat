import { useDispatch, useSelector } from 'react-redux';
import ProceedButton from '@maeek/neutrino-design/components/buttons/Proceed';
import { getMeUsername } from '@/selectors/user';
import {
  Chip,
  Heading,
  Input,
  Modal,
  Paragraph,
  Text,
  useAccessibility
} from '@maeek/neutrino-design';
import './new-channel.scss';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { InputRef } from '@maeek/neutrino-design/components/inputs/text/Input';
import { CloseRounded } from '@material-ui/icons';
import { CheckboxBox } from '@/components/settings/pages/notifications/notf-switch';
import { addChannels } from '@/store/channels/actions';

export interface MainSearchBarAddChannelModalProps {
  onClose?: () => void;
}

export const MainSearchBarAddChannelModal = ({
  onClose
}: MainSearchBarAddChannelModalProps) => {
  const username = useSelector(getMeUsername);
  const [users, setUsers] = useState<string[]>([]);
  const { onEnter } = useAccessibility();
  const usersInputRef = useRef<InputRef>(null);
  const [channelName, setChannelName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const dispatch = useDispatch();

  const focusOnRender = useCallback((node: HTMLDivElement) => {
    node?.focus();
  }, []);

  const onCreate = () => {};

  return (
    <Modal mountPointId='modal-root'>
      <div className='create-new-channel-modal'>
        <div className='create-new-channel-modal-box'>
          <div
            className='create-new-channel-modal-close'
            tabIndex={0}
            onClick={onClose}
            onKeyUp={onEnter(onClose)}
            ref={focusOnRender}
          >
            <CloseRounded />
          </div>
          <div>
            <Heading level={2}>Create new channel</Heading>
            <Text>Name</Text>
            <Input
              placeholder='Channel name'
              className='create-new-channel-name'
              onChange={(e: string) => {
                setChannelName(e);
              }}
            />
            <div className='create-new-channel-members'>
              <Text>Members</Text>

              <Input
                ref={usersInputRef}
                placeholder='Add users to this channel'
                className='create-new-channel-users-input'
                type='search'
                onKeyUp={onEnter((e: KeyboardEvent<HTMLInputElement>) => {
                  const t = e.target as HTMLInputElement;
                  if (!t.value) return;
                  setUsers((prev) => [...new Set([...prev, t.value])]);
                  usersInputRef.current?.setValue('');
                })}
              />
              <Paragraph>
                <Text style={{ fontSize: 'var(--fs-200)' }}>
                  Add users to your new channel. Type their username and press
                  enter.
                </Text>
              </Paragraph>
              <div className='create-new-channel-users-chips'>
                <Chip type='round' size={'large'} color='blue'>
                  {username}
                </Chip>
                {users.map((user) => (
                  <Chip
                    type='round'
                    size={'large'}
                    deletable
                    onDelete={() => {
                      setUsers((prev) => prev.filter((u) => u !== user));
                    }}
                  >
                    {user}
                  </Chip>
                ))}
              </div>
              <CheckboxBox
                field='public'
                title='Public channel'
                description='Allow users to join this channel without invitation.'
                checked={isPublic}
                onChange={(_field, value) => setIsPublic(value)}
              />
            </div>
          </div>
          <ProceedButton disabled={channelName.length === 0}>
            Create
          </ProceedButton>
        </div>
      </div>
    </Modal>
  );
};

export default MainSearchBarAddChannelModal;
