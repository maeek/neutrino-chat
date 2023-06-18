import {
  createRef,
  KeyboardEventHandler,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  useRef
} from 'react';
import { useHistory } from 'react-router';
import { InputRef } from '@maeek/neutrino-design/components/inputs/text/Input';
import { Text } from '@maeek/neutrino-design/components/typography/text';
import Navigator from '@/utils/navigation';
import { NewReleasesRounded } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { getMeUsername } from '@/selectors/user';
import './list.scss';

export enum SuggestionItemTypes {
  USER = 'user',
  CHANNEL = 'channel'
}

export interface SuggestionsListElement {
  id: string;
  name: string;
  link: string;
  type: SuggestionItemTypes;
  // Channel
  owner?: string;
}

export interface SearchBarSuggestionsListProps {
  list: SuggestionsListElement[];
  children?: ReactNode;
  firstElementRef?: MutableRefObject<HTMLLIElement>;
  lastElementRef?: MutableRefObject<HTMLLIElement>;
  inputRef?: InputRef;
  onClose?: () => void;
}

export const SearchBarSuggestionsList = ({
  list,
  children,
  firstElementRef,
  lastElementRef,
  inputRef,
  onClose
}: SearchBarSuggestionsListProps) => {
  const history = useHistory();
  const listRefs = useRef<MutableRefObject<any>[]>([]);
  const username = useSelector(getMeUsername);

  const preventDefault = (e: MouseEvent) => e.preventDefault();

  const onClick =
    (link: string): MouseEventHandler =>
      (e) => {
        e.preventDefault();
        Navigator.forward(history, link);
      };

  const onKeyDown =
    (link: string, i: number): KeyboardEventHandler =>
      (e) => {
        if ([ 'Enter', ' ' ].includes(e.code)) {
          e.preventDefault();
          onClick(link)(e as never);
        } else if (e.code === 'ArrowDown') {
          e.preventDefault();
          if (
            listRefs.current.length > i + 1 &&
          listRefs.current[ i + 1 ]?.current
          ) {
            listRefs.current[ i + 1 ].current.focus();
          } else {
            if (inputRef?.element) {
              (inputRef.element as unknown as HTMLInputElement).focus();
            }
          }
        } else if (e.code === 'ArrowUp') {
          e.preventDefault();
          if (i - 1 >= 0 && listRefs.current[ i - 1 ]?.current) {
            listRefs.current[ i - 1 ].current.focus();
          } else {
            if (inputRef?.element) {
              (inputRef.element as unknown as HTMLInputElement).focus();
            }
          }
        } else if (e.code === 'Escape') {
          e.preventDefault();
          if (inputRef?.element) {
          // @ts-ignore
            inputRef?.element?.focus();
          }

          if (onClose) {
            onClose();
          }
        }
      };

  return list.length > 0 ? (
    <>
      {children}
      <ul className='main-search-bar-suggestions-list'>
        {list.map(
          ({ id, name, link, type, ...rest }: SuggestionsListElement, i) => {
            let ref;

            if (i === 0) {
              ref = firstElementRef || createRef();
            } else if (i === list.length - 1) {
              ref = lastElementRef || createRef();
            } else {
              ref = createRef();
            }

            listRefs.current[ i ] = ref;

            const renderChannelOwner =
              type === SuggestionItemTypes.CHANNEL ? (
                <Text
                  className='main-search-bar-suggestions-list-element-desc'
                  disabled
                >
                  owner:{' '}
                  <Text strong disabled>
                    {rest.owner}
                  </Text>
                </Text>
              ) : null;

            return (
              <li
                ref={ref as never}
                key={id}
                className='main-search-bar-suggestions-list-element'
                tabIndex={0}
                onClick={onClick(link)}
                onKeyDown={onKeyDown(link, i)}
              >
                <Text
                  type='primary'
                  link={link}
                  onClick={preventDefault}
                  tabIndex={-1}
                >
                  {type === SuggestionItemTypes.USER && name === username ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>Note to self</span>
                      <NewReleasesRounded
                        style={{
                          color: 'var(--clr-actions-400)',
                          marginLeft: '0.3rem',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  ) : (
                    name
                  )}
                  {renderChannelOwner}
                </Text>
              </li>
            );
          }
        )}
      </ul>
    </>
  ) : null;
};
