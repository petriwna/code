import React from 'react';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';
// eslint-disable-next-line @emotion/no-vanilla
import { css } from '@emotion/css';

import { Note } from '../../mainSlice';
import { NoteListItem } from './NoteListItem';

const state = {
  listHeight: 725,
  listRowHeight: 50,
  overscanRowCount: 10,
  scrollToIndex: undefined,
  showScrollingPlaceholder: false,
  useDynamicRowHeight: false,
};

export function ListView({ notes }: { notes: Array<Note> }) {
  const listView = React.useRef<List | null>();

  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    const datum = notes[index];

    return (
      <div key={key} style={style}>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            border-radius: 0.5rem;
            padding: 0.5rem;
            background-color: #f7f7f7;
            word-break: break-all;
          `}
          style={{ ...style }}
        >
          <NoteListItem data={datum} />
        </div>
      </div>
    );
  };

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <List
          ref={(ref) => {
            listView.current = ref;
          }}
          height={state.listHeight}
          overscanRowCount={state.overscanRowCount}
          rowCount={notes.length}
          rowHeight={state.listRowHeight}
          rowRenderer={rowRenderer}
          scrollToIndex={state.scrollToIndex}
          width={width}
        />
      )}
    </AutoSizer>
  );
}
