import { Heading } from '@maeek/neutrino-design/components/typography/heading';
import { Text } from '@maeek/neutrino-design/components/typography/text';
import './statistics.scss';

export const ProfileStatistics = () => {
  return (
    <div className='me-profile-statistics'>
      <Heading className='me-profile-statistics-heading' level={5}>
        Statistics
      </Heading>
      <ul className='me-profile-statistics-list'>
        <li className='me-profile-statistics-list-entry'>
          <Text strong className='me-profile-statistics-list-entry-counter'>
            4
          </Text>
          <Text className='me-profile-statistics-list-entry-desc'>
            Messages
          </Text>
        </li>
        <li className='me-profile-statistics-list-entry'>
          <Text strong className='me-profile-statistics-list-entry-counter'>
            2
          </Text>
          <Text className='me-profile-statistics-list-entry-desc'>
            Channels
          </Text>
        </li>
        <li className='me-profile-statistics-list-entry'>
          <Text strong className='me-profile-statistics-list-entry-counter'>
            0
          </Text>
          <Text className='me-profile-statistics-list-entry-desc'>Files</Text>
        </li>
      </ul>
    </div>
  );
};

export default ProfileStatistics;
