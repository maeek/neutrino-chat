import {
  ActionButton,
  Heading,
  useAccessibility,
  Paragraph
} from '@maeek/neutrino-design';
import { SessionsList } from './sessions/sessions-list';
import { useCallback, useEffect, useState } from 'react';
import { ApiMe } from '@/api/me';
import { useDispatch } from 'react-redux';
import { logout } from '@/actions/auth';
import { addNewError } from '@/store/app/errors/actions';
import { unifiedErrorTemplate } from '@/store/app/errors/error';
import './sessions-setting.scss';

export const SessionsSetting = () => {
  const [ sessions, setSessions ] = useState<any>([]);
  const { onEnter } = useAccessibility();
  const [ isFetching, setIsFetching ] = useState(false);
  const dispatch = useDispatch();

  const clearSessions = async () => {
    await ApiMe.deleteSessions(sessions.map((s: any) => s.id));
    await dispatch(logout());
  };

  const updateList = useCallback(async () => {
    setIsFetching(true);
    ApiMe.getSessions()
      .then((response) => {
        setSessions(response.data.items);
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          addNewError(
            unifiedErrorTemplate(e.type, 'Failed to load sessions', null, {
              shouldLogout: [ 401, 403 ].includes(e.base.response.status)
            })
          )
        );
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  useEffect(() => {
    if (sessions.length === 0 && !isFetching) {
      updateList();
    }
  }, [ sessions ]);

  return (
    <div className='setting-sessions-preview-container'>
      <Heading level={4}>Active Sessions</Heading>
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
      <SessionsList updateList={updateList} sessions={sessions} />
    </div>
  );
};

export default SessionsSetting;
