import { ArrowLeftRounded, ArrowRightRounded } from '@material-ui/icons';
import './pagination.scss';
import { Text, useAccessibility } from '@maeek/neutrino-design';
import { KeyboardEvent } from 'react';

export interface PaginationProps {
  page: number;
  maxPages: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const Pagination = ({
  maxPages,
  nextPage,
  page,
  prevPage,
  setPage
}: PaginationProps) => {
  const { onEnter, onArrowLeft, onArrowRight } = useAccessibility();

  return (
    <ul className='common-pagination'>
      <li className='common-pagination-arrows'>
        <Text disabled={page === 0} onClick={page !== 0 ? prevPage : undefined}>
          <ArrowLeftRounded />
        </Text>
      </li>
      {[...Array(maxPages).keys()]
        .slice(
          Math.max(0, page > 4 ? page - 4 : 0),
          Math.min(
            maxPages,
            page < 5 ? 6 : page + 4 < maxPages ? page + 4 : maxPages
          )
        )
        .map((i) => (
          <li className='common-pagination-page'>
            <Text
              strong={page === i}
              className={page === i ? 'common-pagination-page--focused' : ''}
              onClick={() => setPage(i)}
              tabIndex={0}
              onKeyUp={(e: KeyboardEvent) => {
                onEnter(() => setPage(i))(e);
                onArrowLeft(prevPage)(e);
                onArrowRight(nextPage)(e);
              }}
            >
              {i + 1}
            </Text>
          </li>
        ))}
      <li
        className='common-pagination-arrows'
        onClick={page !== maxPages ? nextPage : undefined}
      >
        <Text disabled={page + 1 === maxPages}>
          <ArrowRightRounded />
        </Text>
      </li>
    </ul>
  );
};
