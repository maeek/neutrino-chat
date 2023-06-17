import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  WindowScroller,
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';
import { getFilteredUsersIdsWithMessagesAndGroups } from '@/selectors/filters';
import DmListRow from './row';
import { MessageTypes } from '@/store/messages/types';
import './list.scss';
import { Text } from '@maeek/neutrino-design';

export interface UserDmListProps {
  onSelected?: (id: string, type: MessageTypes) => void;
}

export const DmList = ({ onSelected }: UserDmListProps) => {
  const IdsAndTypesTuple = useSelector(
    getFilteredUsersIdsWithMessagesAndGroups
  );
  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        defaultHeight: 50,
        fixedWidth: true
      }),
    []
  );

  return IdsAndTypesTuple.length > 0 ? (
    <WindowScroller scrollElement={window}>
      {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) =>
        registerChild && (
          <div className='dm-list-autosizer-boundry'>
            <AutoSizer disableHeight>
              {({ width }) => (
                <div ref={registerChild}>
                  <List
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    overscanRowCount={5}
                    rowCount={IdsAndTypesTuple.length}
                    rowRenderer={({ index, key, parent, style }) => (
                      <CellMeasurer
                        cache={cache}
                        columnIndex={0}
                        key={`CellMeasurerRow_${key}`}
                        parent={parent}
                        rowIndex={index}
                      >
                        {({ measure, registerChild: regChild }) =>
                          regChild && (
                            <div
                              style={style}
                              className='dm-list-row-wrapper'
                              ref={(el) => regChild?.(el as Element)}
                            >
                              <DmListRow
                                isScrolling={isScrolling}
                                key={key}
                                id={IdsAndTypesTuple[index][0]}
                                type={
                                  IdsAndTypesTuple[index][1] as MessageTypes
                                }
                                measure={measure}
                                onClick={onSelected}
                              />
                            </div>
                          )
                        }
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
        )
      }
    </WindowScroller>
  ) : (
    <div className='dm-list-no-chats'>
      <Text type='secondary'>
        You have no chats yet. Search for the user or group in the search bar
        above.
      </Text>
    </div>
  );
};

export default DmList;
