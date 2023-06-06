import { MouseEvent, memo } from 'react';
import { Heading } from '@maeek/neutrino-design/components/typography/heading';
import { Text } from '@maeek/neutrino-design/components/typography/text';
import Navigator from '@/utils/navigation';
import { useHistory } from 'react-router-dom';
import './footer.scss';

export const GenericFooter = () => {
  const history = useHistory();

  const redirectToLogin = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    Navigator.forward(history, '/login');
  };

  const redirectToRegister = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    Navigator.forward(history, '/join');
  };

  return (
    <div className='generic-footer'>
      <div className='generic-footer-inner'>
        <Heading level={5}>
          <Text strong>
            Projekt i implementacja internetowego komunikatora.
          </Text>
        </Heading>
        <div>
          <Text disabled type='secondary'>
            Maciej Suchanecki &copy; {new Date().getFullYear()}
          </Text>
        </div>
        <ul style={{ color: '#fff' }}>
          <li>
            <Text link='/login' onClick={redirectToLogin}>
              Sign in
            </Text>
          </li>
          <li>
            <Text link='/join' onClick={redirectToRegister}>
              Register
            </Text>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(GenericFooter);
