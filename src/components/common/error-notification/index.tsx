import { RootState } from '@/store/root';
import { Heading, Modal, Text } from '@maeek/neutrino-design';
import { useDispatch, useSelector } from 'react-redux';
import { CloseRounded } from '@material-ui/icons';
import { useCallback } from 'react';
import { clearError } from '@/store/app/errors/actions';
import './error-notification.scss';

export const ErrorNotification = () => {
  const errors = useSelector((state: RootState) => state.app.errors);
  const dispatch = useDispatch();

  const onClose = (uuid: string) => {
    dispatch(clearError(uuid));
  };

  const dismissError = useCallback((node: HTMLDivElement) => {
    const abortController = new AbortController();
    node?.addEventListener(
      'transitionend',
      () => {
        const uuid = node?.dataset?.error;
        abortController.abort();
        dispatch(clearError(uuid));
      },
      { signal: abortController.signal }
    );
    setTimeout(() => {
      node?.classList.add('error-notification-item--dismissed');
    }, 2000);
  }, []);

  console.log(errors.list);
  if (errors.list.length === 0) {
    return null;
  }

  return (
    <Modal mountPointId='modal-root'>
      <div className='error-notification'>
        {errors.list.map((error) => (
          <div
            key={error.uuid}
            className='error-notification-item'
            data-error={error.uuid}
            ref={dismissError}
          >
            <Text strong monospace>
              {error.message}
            </Text>
            <CloseRounded onClick={() => onClose(error.uuid)} />
          </div>
        ))}
      </div>
    </Modal>
  );
};
