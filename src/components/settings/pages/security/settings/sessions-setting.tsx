import {
  ActionButton,
  Heading,
  useAccessibility,
  Paragraph
} from '@maeek/neutrino-design';
import './sessions-setting.scss';
import { SessionsList } from './sessions/sessions-list';

export const SessionsSetting = () => {
  const { onEnter } = useAccessibility();

  const clearSessions = () => {
    alert('Clear sessions');
  };

  return (
    <div className='setting-sessions-preview-container'>
      <Heading level={4}>Log out of all active sessions</Heading>
      <Paragraph>
        This will log you out of all active sessions. You will be logged out of
        all devices and will have to log in again.
      </Paragraph>
      <div className='image-change-footer'>
        <ActionButton
          type='button'
          onKeyDown={onEnter(clearSessions)}
          onClick={clearSessions}
          className='setting-bio-button'
        >
          Clear all active sessions
        </ActionButton>
      </div>
      <SessionsList />
    </div>
  );
};

export default SessionsSetting;
