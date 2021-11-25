import { ReactNode, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { WindowScroller, List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { getFilteredUsersIds, getFiltersMain } from '@/selectors/filters';
import { FilterCategory } from '@/store/app/filters/types';
import MainListRow from './row';
import './list.scss';
import { debounce } from 'lodash';

export interface MainListProps {}

const recalculateColumns = () => {
  if (window.innerWidth <= 300) {
    return 1;
  }
  else if (window.innerWidth <= 605) {
    return 2;
  }
  else if (window.innerWidth <= 786) {
    return 3;
  }
  else if (window.innerWidth <= 900) {
    return 2;
  }
  else if (window.innerWidth <= 1100) {
    return 3;
  }
  else if (window.innerWidth <= 1400) {
    return 4;
  }
  else if (window.innerWidth <= 2239) {
    return 5;
  }
  else if (window.innerWidth <= 3840) {
    return 7;
  }

  return 8;
};

export const MainList = () => {
  const debounceRender = useRef(debounce((fn: Function) => fn(), 100));
  const debounceRenderCurrent = debounceRender.current;
  const usersIds = useSelector(getFilteredUsersIds);
  const selectedCategory = useSelector(getFiltersMain);
  const [ columnsCount, setColumnsCount ] = useState(() => recalculateColumns());

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        defaultHeight: 50,
        fixedWidth: true
      }),
    []
  );

  const onResize = () => {
    debounceRenderCurrent(() => {
      setColumnsCount(recalculateColumns());
      cache.clearAll();
    });
  };

  const renderRow = (index: number) => {
    const fragments: ReactNode[] = [];
    const fromIndex = index * columnsCount;
    const toIndex = Math.min(fromIndex + columnsCount, usersIds.length);

    for (let i = fromIndex; i < toIndex; i++) {
      fragments.push(
        <MainListRow
          id={usersIds[ i ]}
          key={usersIds[ i ]}
        />
      );
    }

    return fragments;
  };

  return usersIds.length > 0
    && (selectedCategory === FilterCategory.USER || selectedCategory === FilterCategory.ALL)
    ? (
      <WindowScroller
        scrollElement={window}
      >
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => registerChild && (
          <div className="main-list-autosizer-boundry">
            <AutoSizer disableHeight onResize={onResize}>
              {({ width }) => (
                <List
                  ref={registerChild}
                  autoHeight
                  height={height}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  overscanRowCount={5}
                  rowCount={Math.ceil(usersIds.length / columnsCount)}
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
                          className="main-list-row-wrapper"
                          ref={(el) => regChild?.(el as Element)}
                          onLoad={measure}
                        >
                          {renderRow(index)}
                        </div>
                      )}
                    </CellMeasurer>
                  )}
                  scrollTop={scrollTop}
                  rowHeight={cache.rowHeight}
                  width={width}
                />
              )}
            </AutoSizer>
          </div>
        )}
      </WindowScroller>
    )
    : null;
};

export default MainList;
