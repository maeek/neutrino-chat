import { SessionsListEntry } from './session-entry';
import { useMemo, useState } from 'react';
import { Input, usePagination } from '@maeek/neutrino-design';
import { Pagination } from '@/components/common/pagination/pagination';
import './sessions-list.scss';
import classNames from 'classnames';

const PER_PAGE = 5;

const sessions = new Array(58).fill(0).map((_, i) => ({
  id: (i + 1).toString(),
  device: 'Android Chrome ' + i
}));

export const SessionsList = () => {
  const [search, setSearch] = useState('');
  const sessionMemo = useMemo(
    () =>
      sessions.filter((session) =>
        session.device.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const { page, currentPage, goToPage, nextPage, prevPage } = usePagination<
    (typeof sessions)[number]
  >(sessionMemo, PER_PAGE);
  const maxPagesUnfiltered = Math.ceil(sessions.length / PER_PAGE);
  const maxPages = Math.ceil(sessionMemo.length / PER_PAGE);

  return (
    <>
      <Input
        key='sessions-search-input'
        type='search'
        placeholder='Search active sessions'
        className='settings-sessions-search'
        onChange={(e: string) => {
          console.log(e);
          setSearch(e);
          goToPage(0);
        }}
        value={search}
      />
      <ul
        className={classNames('settings-sessions-list', {
          'settings-sessions-list--reserved':
            maxPagesUnfiltered > 1 ||
            (maxPagesUnfiltered > 1 && maxPages === 0 && search.length > 0)
        })}
      >
        {page.map((session) => (
          <SessionsListEntry id={session.id} device={session.device} />
        ))}
      </ul>
      {maxPages > 1 && (
        <Pagination
          maxPages={maxPages}
          page={currentPage}
          setPage={goToPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
    </>
  );
};
