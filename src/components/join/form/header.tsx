import { Heading } from '@maeek/neutrino-design/components/typography/heading';
import { Paragraph } from '@maeek/neutrino-design/components/typography/paragraph';
import { Text } from '@maeek/neutrino-design';
import { useHistory, useLocation } from 'react-router-dom';
import { MouseEvent, useMemo } from 'react';
import Navigator from '@/utils/navigation';
import './header.scss';

export const RegisterFormHeader = () => {
  const history = useHistory();
  const { search } = useLocation<{ method: string }>();
  const method = useMemo(
    () => new URLSearchParams(search)?.get('method') || '',
    [search]
  );

  const redirectToWebAuthn = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    Navigator.replace(history, '/join', {}, '?method=webauthn');
  };

  const redirectToPassword = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    Navigator.replace(history, '/join');
  };

  return (
    <div className='form-register-header'>
      <Heading level={2}>Start Chatting!</Heading>
      <Paragraph>
        {!method ? (
          <Text>
            Change registration method to{' '}
            <Text highlight>Passwordless experience</Text> by clicking{' '}
            <Text link='/join?method=authn' onClick={redirectToWebAuthn}>
              here
            </Text>
            .
          </Text>
        ) : (
          <Text>
            Change registration method to <Text highlight>Standard</Text> by
            clicking{' '}
            <Text link='/join' onClick={redirectToPassword}>
              here
            </Text>
            .
          </Text>
        )}
      </Paragraph>
    </div>
  );
};
