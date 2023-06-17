import { useSelector } from 'react-redux';
import ActionButton from '@maeek/neutrino-design/components/buttons/Action';
import { AddRounded, GroupAddRounded } from '@material-ui/icons';
import { getMeColor } from '@/selectors/user';
import { useAccessibility } from '@maeek/neutrino-design';

export const MainSearchBarAddButton = () => {
  const { onEnter } = useAccessibility();
  const meColor = useSelector(getMeColor);

  const addNewChannel = () => {
    alert('Add new channel');
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
    </div>
  );
};

export default MainSearchBarAddButton;
