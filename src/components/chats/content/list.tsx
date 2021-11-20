import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { WindowScroller, List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { getFilteredUsersIdsWithMessages, getFiltersMain } from '@/selectors/filters';
import { FilterCategory } from '@/store/app/filters/types';
import UserDmListRow from './row';
import './list.scss';

export interface UserDmListProps {}

export const UserDmList = () => {
  const usersIds = useSelector(getFilteredUsersIdsWithMessages);
  const selectedCategory = useSelector(getFiltersMain);

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        defaultHeight: 50,
        fixedWidth: true
      }),
    []
  );

  return usersIds.length > 0
    && (selectedCategory === FilterCategory.USER || selectedCategory === FilterCategory.ALL)
    ? (
      <WindowScroller
        scrollElement={window}
      >
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => registerChild && (
          <div className="dm-list-autosizer-boundry">
            <AutoSizer disableHeight>
              {({ width }) => (
                <div ref={registerChild}>
                  <List
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    overscanRowCount={5}
                    rowCount={usersIds.length}
                    rowRenderer={({ index, key, parent, style }) => (
                      <CellMeasurer
                        cache={cache}
                        columnIndex={0}
                        key={`CellMeasurerRow_${key}`}
                        parent={parent}
                        rowIndex={index} 
                      >
                        {({ measure, registerChild: regChild }) => regChild && (
                          <div
                            style={style}
                            className="dm-list-row-wrapper"
                            ref={(el) => regChild?.(el as Element)}
                          >
                            <UserDmListRow
                              isScrolling={isScrolling}
                              key={key}
                              id={usersIds[ index ]}
                              measure={measure}
                            />
                          </div>
                        )}
                      </CellMeasurer>
                    )}
                    scrollTop={scrollTop}
                    rowHeight={cache.rowHeight}
                    width={width}
                  />
                </div>
              )}
            </AutoSizer>
          </div>
        )}
      </WindowScroller>
    )
    : null;
};

export default UserDmList;
