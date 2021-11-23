import { useEffect } from 'react';
import Heading from '@maeek/neutrino-design/components/atoms/typography/heading/Heading';
import Paragraph from '@maeek/neutrino-design/components/atoms/typography/paragraph/Paragraph';
import Text from '@maeek/neutrino-design/components/atoms/typography/text/Text';
import { ReactComponent as ServerDownImage } from '@/assets/images/undraw_server_down_s4lk.svg';
import './error.scss';

interface MainViewErrorProps {
  message?: string;
}

export const MainViewError = ({ message }: MainViewErrorProps) => {
  useEffect(() => {
    if (!message) return;

    console.error('Unexpected error occured\n\n', message);
  }, [ message ]);

  return (
    <div className="view-root view-root--main view-root--main-error">
      <div className="error-container">
        <Heading><Text type="danger" strong>011010100100...Err!</Text></Heading>
        <Paragraph className="error-desc"><Text type="secondary">Unexpected error occured, check console for more information</Text></Paragraph>
      </div>
      <ServerDownImage className="error-img" />
    </div>
  );
};

export default MainViewError;
