import { useSelector } from 'react-redux';
import ActionButton from '@maeek/neutrino-design/components/buttons/Action';
import ProceedButton from '@maeek/neutrino-design/components/buttons/Proceed';
import { GroupAddRounded } from '@material-ui/icons';
import { getMeColor } from '@/selectors/user';
import { useAccessibility } from '@maeek/neutrino-design';
import MainSearchBarAddChannelModal from './new-channel';
import { useState } from 'react';

export const MainSearchBarAddButton = () => {
  const { onEnter } = useAccessibility();
  const meColor = useSelector(getMeColor);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNewChannel = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='main-search-bar-add'>
      <ActionButton
        type='button'
        className='main-search-bar-action main-search-bar-action--compact'
        style={{
          background: meColor || undefined,
          border: 'currentColor',
          color: 'currentColor'
        }}
        onClick={addNewChannel}
        onKeyUp={onEnter(addNewChannel)}
        title='Add new channel'
      >
        <GroupAddRounded
          style={{
            color: meColor || undefined,
            mixBlendMode: 'difference'
          }}
        />
      </ActionButton>
      {isModalOpen && (
        <MainSearchBarAddChannelModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default MainSearchBarAddButton;
