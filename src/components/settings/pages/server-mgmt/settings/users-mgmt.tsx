import { useSelector } from 'react-redux';
import { getUsersIds } from '@/selectors/users';
import { UsersMgmtEntry } from './users-mgmt-entry';
import {
  Heading,
  Input,
  Paragraph,
  usePagination
} from '@maeek/neutrino-design';
import { useMemo, useState } from 'react';
import { Pagination } from '@/components/common/pagination/pagination';
import './users-mgmt.scss';

const PER_PAGE = 10;

export const UsersMgmt = () => {
  const users = useSelector(getUsersIds);
  const [search, setSearch] = useState('');
  const usersMemo = useMemo(
    () =>
      users.filter((user) => user.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const { page, currentPage, goToPage, nextPage, prevPage } = usePagination<
    (typeof users)[number]
  >(usersMemo, PER_PAGE);
  const maxPagesUnfiltered = Math.ceil(users.length / PER_PAGE);
  const maxPages = Math.ceil(usersMemo.length / PER_PAGE);

  return (
    <div className='setting-users-preview-container'>
      <Heading level={4}>Users</Heading>
      <Paragraph>
        Here you can manage users. You can delete them, change their roles and
        more.
      </Paragraph>
      <Input
        key='users-search-input'
        type='search'
        placeholder='Search users'
        className='settings-users-search'
        onChange={(e: string) => {
          console.log(e);
          setSearch(e);
          goToPage(0);
        }}
        value={search}
      />
      <ul className='user-mgmt-list'>
        {page.map((user) => (
          <UsersMgmtEntry id={user} />
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
    </div>
  );
};
