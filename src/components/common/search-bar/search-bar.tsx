import { useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { Input } from '@maeek/neutrino-design/components/atoms/inputs/text/Input';
import { setFilterCust, setFilterSearch } from '@/store/app/filters/actions';
import { getFiltersSearch } from '@/selectors/filters';
import MainSearchBarAddButton from './add-button';
import { SearchBarSuggestions } from './suggestions/suggestions';
import './search-bar.scss';

const getKeyValues = (v: string) => {
  const newStr = v.split('@');

  return newStr.filter(kp => kp)
    .map(kp => {
      const newKp = kp.split(':').filter(val => val);
      return newKp;
    });
};

export const MainSearchBar = () => {
  const dispatch = useDispatch();
  const [ isFocused, setIsFocused ] = useState(false);
  const searchedValue = useSelector(getFiltersSearch);
  const inputRef = useRef<any>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const firstSuggestionsRef = useRef<HTMLLIElement>(null as unknown as HTMLLIElement);
  const lastSuggestionsRef = useRef<HTMLLIElement>(null as unknown as HTMLLIElement);

  const updateQueries = useRef(debounce((v: string) => {
    const qs = getKeyValues(v.trim().toLocaleLowerCase()).map((q) => {
      const [ fieldName, value ] = q;

      if (q.length === 2) {
        return {
          fieldName,
          value
        };
      }

      return {
        fieldName: '',
        value: q[ 0 ]
      };
    });

    dispatch(setFilterCust(qs));
  }, 300));

  const onInputChange = useCallback((v: string) => {
    dispatch(setFilterSearch(v));
    updateQueries.current(v);
  }, [ dispatch ]);

  const handleAccessibility = (e: KeyboardEvent) => {
    if (isFocused && firstSuggestionsRef.current && e.code === 'ArrowDown') {
      e.preventDefault();
      firstSuggestionsRef.current.focus();
    }
    else if (isFocused && lastSuggestionsRef.current && e.code === 'ArrowUp') {
      e.preventDefault();
      lastSuggestionsRef.current.focus();
    }
    else if (isFocused && e.code === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setIsFocused(false);
    }
  };

  useEffect(() => {
    const closeSuggestions = () => setIsFocused(false);

    const handleClickOutside = (e: any) => {
      if (
        inputRef?.current?.element && suggestionsRef.current
        && (e.target !== inputRef.current.element)
        && (!inputRef.current?.element?.contains(e.target))
      ) {
        closeSuggestions();
      }
    };

    document.addEventListener('click', handleClickOutside as any);
    window.addEventListener('blur', closeSuggestions);
    return () => {
      document.removeEventListener('click', handleClickOutside as any);
      window.removeEventListener('blur', closeSuggestions);
    };
  }, []);

  return (
    <section className="main-search-bar">
      <MainSearchBarAddButton />
      <Input
        ref={inputRef}
        placeholder="Search"
        className="main-search-bar-input"
        type="search"
        value={searchedValue}
        onChange={onInputChange}
        onClick={() => setIsFocused(true)}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleAccessibility}
      />
      <SearchBarSuggestions
        ref={suggestionsRef}
        isVisible={isFocused}
        onClose={() => setIsFocused(false)}
        searchedValue={searchedValue}
        firstSuggestionRef={firstSuggestionsRef}
        lastSuggestionRef={lastSuggestionsRef}
        inputRef={inputRef?.current}
      />
    </section>
  );
};

export default MainSearchBar;
