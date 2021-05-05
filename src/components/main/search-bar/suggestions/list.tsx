import {
  createRef,
  KeyboardEventHandler,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  useRef
} from 'react';
import { useHistory } from 'react-router';
import { Text } from '@maeek/neutrino-design/components/atoms/typography/text';
import { InputRef } from '@maeek/neutrino-design/components/atoms/inputs/text/Input';
import Navigator from '@/utils/navigation';

export interface SuggestionsListElement {
  id: string;
  name: string;
  link: string;
}

export interface SearchBarSuggestionsListProps {
  list: SuggestionsListElement[];
  children?: ReactNode;
  firstElementRef?: MutableRefObject<HTMLLIElement>;
  inputRef?: InputRef;
}

export const SearchBarSuggestionsList = ({
  list,
  children,
  firstElementRef,
  inputRef
}: SearchBarSuggestionsListProps) => {
  const history = useHistory();
  const listRefs = useRef<MutableRefObject<any>[]>([]);

  const preventDefault = (e: MouseEvent) => e.preventDefault();

  const onClick = (link: string): MouseEventHandler => (e) => {
    preventDefault(e as unknown as MouseEvent);
    Navigator.forward(history, link);
  };

  const onKeyDown = (link: string, i: number): KeyboardEventHandler => (e) => {
    if ([ 'Enter', ' ' ].includes(e.code)) {
      preventDefault(e as unknown as MouseEvent);
      onClick(link)(e as never);
    }

    else if (e.code === 'ArrowDown') {
      preventDefault(e as unknown as MouseEvent);
      if (listRefs.current.length > i + 1 && listRefs.current[ i + 1 ]?.current) {
        listRefs.current[ i + 1 ].current.focus();
      } else {
        if (inputRef?.element) {
          (inputRef.element as unknown as HTMLInputElement).focus();
        }
      }
    }

    else if (e.code === 'ArrowUp') {
      preventDefault(e as unknown as MouseEvent);
      if (i - 1 >= 0 && listRefs.current[ i - 1 ]?.current) {
        listRefs.current[ i - 1 ].current.focus();
      } else {
        if (inputRef?.element) {
          (inputRef.element as unknown as HTMLInputElement).focus();
        }
      }
    }
  };

  return list.length > 0 ? (
    <>
      {children}
      <ul className="main-search-bar-suggestions-list">
        {
          list.map(({ id, name, link }: SuggestionsListElement, i) => {
            const ref = i === 0 
              ? firstElementRef || createRef()
              : createRef();
            
            listRefs.current[ i ] = ref;

            return (
              <li
                ref={ref as never}
                key={id}
                className="main-search-bar-suggestions-list-element"
                tabIndex={0}
                onClick={onClick(link)}
                onKeyDown={onKeyDown(link, i)}
              >
                <Text
                  type="primary"
                  link={link}
                  onClick={preventDefault}
                  tabIndex={-1}
                >
                  {name}
                </Text>
              </li>
            );
          })
        }
      </ul>
    </>
  ) : null;
};
