import { forwardRef, MutableRefObject } from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
// import { Heading } from '@maeek/neutrino-design/components/atoms/typography/heading';
import { InputRef } from '@maeek/neutrino-design/components/atoms/inputs/text/Input';
import { getFilteredChannelsByQueries, getFilteredContactsByQueries } from '@/selectors/filters';
import { RootState } from '@/store/root';
import { Channel } from '@/store/channels/types';
import { Contact } from '@/store/me/contacts/types';
import { SearchBarSuggestionsList } from './list';
import './suggestions.scss';

export interface SearchBarSuggestionsProps {
  searchedValue?: string;
  isVisible?: boolean;
  firstSuggestionRef?: MutableRefObject<HTMLLIElement>;
  onClose?: () => void;
  inputRef?: InputRef;
}

export const SearchBarSuggestions = forwardRef<HTMLDivElement, SearchBarSuggestionsProps>((
  { searchedValue, isVisible, firstSuggestionRef, inputRef, onClose }, ref
) => {
  const filteredContacts = useSelector<RootState, Contact[]>(getFilteredContactsByQueries);
  const filteredChannels = useSelector<RootState, Channel[]>(getFilteredChannelsByQueries);
  const flatElements = [
    ...filteredContacts.map((c) => ({
      id: c.username,
      name: c.username,
      link: `/users/${c.username}`
    })),
    ...filteredChannels.map((ch) => ({
      id: ch.id,
      name: ch.name,
      link: `/channel/${ch.id}/${ch.name}`
    }))
  ].sort().slice(0, 25);

  const isOpened = !!(
    isVisible
    && searchedValue
    && searchedValue.trim().length > 0
    && (
      filteredChannels.length > 0
      || filteredContacts.length > 0
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
          list={flatElements}
          onClose={onClose}
        />
      )}
    </div>
  );
});
