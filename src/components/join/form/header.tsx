import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { Paragraph } from '@maeek/neutrino-design/components/atoms/typography/paragraph';
import './header.scss';

export const RegisterFormHeader = () => (
  <div className="form-register-header">
    <Heading level={2}>Create Account</Heading>
    <Paragraph>Chat that does not save your messages! Share what's on your mind with anyone you want.</Paragraph>
  </div>
);
