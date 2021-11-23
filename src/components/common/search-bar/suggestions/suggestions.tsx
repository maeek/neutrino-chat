import { MutableRefObject, forwardRef } from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { InputRef } from '@maeek/neutrino-design/components/atoms/inputs/text/Input';
import { SearchBarSuggestionsList, SuggestionItemTypes } from './list';
import { getFilteredUsersByQueries } from '@/selectors/filters';
import { RootState } from '@/store/root';
import { User } from '@/store/users/types';
// import { Channel } from '@/store/channels/types';
import './suggestions.scss';

export interface SearchBarSuggestionsProps {
  searchedValue?: string;
  isVisible?: boolean;
  firstSuggestionRef?: MutableRefObject<HTMLLIElement>;
  lastSuggestionRef?: MutableRefObject<HTMLLIElement>;
  onClose?: () => void;
  inputRef?: InputRef;
}

export const SearchBarSuggestions = forwardRef<HTMLDivElement, SearchBarSuggestionsProps>((
  { isVisible, firstSuggestionRef, lastSuggestionRef, inputRef, onClose }, ref
) => {
  const filteredUsers = useSelector<RootState, User[]>(getFilteredUsersByQueries);
  // const filteredChannels = useSelector<RootState, Channel[]>(getFilteredChannelsByQueries);
  const flatElements = [
    ...filteredUsers.map((c) => ({
      id: c.id,
      name: c.id,
      link: `/u/${c.id}`,
      type: SuggestionItemTypes.USER
    }))
    // ...filteredChannels.map((ch) => ({
    //   id: ch.id,
    //   name: ch.name,
    //   link: `/c/${ch.id}/${ch.name}`,
    //   type: SuggestionItemTypes.CHANNEL,
    //   owner: ch.owner
    // }))
  ].sort().slice(0, 10);

  const isOpened = !!(
    isVisible
    && (
      // filteredChannels.length > 0 ||
      filteredUsers.length > 0
    )
  );
  
  const classes = classnames(
    'main-search-bar-suggestions',
    isOpened && 'main-search-bar-suggestions--visible'
  );

  return (
    <div className={classes} ref={ref}>
      {isOpened && (
        <SearchBarSuggestionsList
          inputRef={inputRef}
          firstElementRef={firstSuggestionRef}
          lastElementRef={lastSuggestionRef}
          list={flatElements}
          onClose={onClose}
        />
      )}
    </div>
  );
});
