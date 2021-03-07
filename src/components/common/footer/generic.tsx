import { Heading, Text } from '@maeek/neutrino-design/components/';
import './footer.scss';

export const GenericFooter = () => (
  <div className="generic-footer">
    <div className="generic-footer-inner">
      <Heading level={5}><Text strong highlight>It's open source!</Text></Heading>
      <Text>
          In case of any issues or enhacement requests visit <Text link="https://github.com/maeek/neutrino-chat.git">Github</Text> repository.
      </Text>
      <div>
        <Text disabled type="secondary">
            Neutrino Chat &copy; {new Date().getFullYear()}
        </Text>
      </div>
    </div>
  </div>
);

export default GenericFooter;
