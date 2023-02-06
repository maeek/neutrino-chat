import { useEffect, useState } from 'react';
import SecondaryButton from '@maeek/neutrino-design/components/buttons/Secondary';
import ActionButton from '@maeek/neutrino-design/components/buttons/Action';
import Heading from '@maeek/neutrino-design/components/typography/heading/Heading';
import Paragraph from '@maeek/neutrino-design/components/typography/paragraph/Paragraph';
import Text from '@maeek/neutrino-design/components/typography/text/Text';
import { ReactComponent as ServerDownImage } from '@/assets/images/error.svg';
import './error.scss';

interface GenericErrorProps {
  message?: string;
}

export const GenericError = ({ message }: GenericErrorProps) => {
  const [isShown, setShown] = useState(false);

  useEffect(() => {
    if (!message) return;

    console.error('Unexpected error occured\n\n', message);
  }, [message]);

  return (
    <div className='common-error'>
      <div className='error-container'>
        <Heading>
          <Text strong>0110 1010 0100...Err!</Text>
        </Heading>
        <Paragraph className='error-desc'>
          <Text type='secondary'>
            Unexpected error occured, refresh the page and contact administrator
            if the issue persist.
          </Text>
        </Paragraph>
        <div className='error-more'>
          <SecondaryButton
            type='button'
            onClick={() => setShown((prev) => !prev)}
            className='error-more-details'
          >
            {isShown ? 'Hide Details' : 'Details'}
          </SecondaryButton>
          <ActionButton type='link' href={window.location.href}>
            Refresh the page
          </ActionButton>
        </div>

        {isShown && (
          <div className='error-details'>
            <Paragraph pre className='error-details-text'>
              {message}
            </Paragraph>
            <Text
              type='secondary'
              link={`https://github.com/maeek/neutrino-chat/issues?q=${encodeURIComponent(
                message + ''
              )}`}
              rel='noopener noreferrer'
              target='_blank'
              className='error-details-report'
            >
              Report the issue
            </Text>
          </div>
        )}
      </div>
      <ServerDownImage className='error-img' />
    </div>
  );
};

export default GenericError;
