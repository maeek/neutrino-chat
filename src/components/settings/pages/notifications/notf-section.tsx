import { ReactNode } from 'react';
import {
  Heading,
  Paragraph
} from '@maeek/neutrino-design/components/typography';
import { SwitchStoreWrapper } from './notf-switch/switch-store-wrapper';
import './notf-section.scss';
import { useSelector } from 'react-redux';
import { getNotificationsSettingsByKey } from '@/selectors/notifications-settings';

export interface NotfSectionProps {
  title: string;
  field: string;
  children?: ReactNode;
  description?: string;
}

export const NotfSection = ({
  title,
  field,
  children,
  description
}: NotfSectionProps) => {
  const { enabled } = useSelector(
    getNotificationsSettingsByKey(field as never)
  );

  return (
    <div className='notf-section'>
      <div className='notf-section-title'>
        <Heading className='notf-section-heading' level={4}>
          {title}
        </Heading>
        <Paragraph className='notf-section-paragraph'>{description}</Paragraph>
      </div>
      <div className='notf-section-inner'>
        <SwitchStoreWrapper
          field={field as never}
          innerField='enabled'
          title='Recieve these notifications'
          description='Enable or disable this notification'
        />
        <SwitchStoreWrapper
          field={field as never}
          innerField='push'
          title='Sound'
          description='Play sound when notification is received'
          disabled={!enabled}
        />
        <SwitchStoreWrapper
          field={field as never}
          innerField='vibrations'
          title='Vibrations'
          description='Vibrate when receiving notifications'
          disabled={!enabled}
        />
      </div>
      {children}
    </div>
  );
};
