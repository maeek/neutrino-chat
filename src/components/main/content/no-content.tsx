import { ReactNode, useCallback, KeyboardEvent } from 'react';
import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import '../styles/no-content.scss';

export interface NoContentProps {
  icon?: ReactNode;
  title?: string;
  text?: ReactNode;
  children?: ReactNode;
  onClick?: any;
}

export const NoContent = (props: NoContentProps) => {
  const {
    text = '',
    title = 'results',
    children,
    icon,
    onClick
  } = props;

  const onEnter = useCallback((fn: Function) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      fn();
    }
  }, []);

  return (
    <div
      className="cards-no-content"
      onClick={onClick}
      onKeyUp={onEnter(onClick)}
      tabIndex={0}
    >
      <div className="cards-no-content-inner">
        {icon}
        <Heading level={3} className="cards-no-content-heading">{title}</Heading>
        <Text disabled className="cards-no-content-text">{text}</Text>
      </div>
      {children}
    </div>
  );
};

export default NoContent;
