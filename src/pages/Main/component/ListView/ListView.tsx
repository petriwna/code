import React from 'react';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';

import { css } from '@emotion/css';
import { Note } from '../../mainSlice';
import { NoteListItem } from './NoteListItem';
// eslint-disable-next-line @emotion/no-vanilla

const state = {
  listHeight: 725,
  listRowHeight: 95,
  overscanRowCount: 10,
  scrollToIndex: undefined,
  showScrollingPlaceholder: false,
  useDynamicRowHeight: false,
};

export function ListView({ notes }: { notes: Array<Note> }) {
  const listView = React.useRef<List | null>();

  const rowRenderer = ({ index, key }: ListRowProps) => {
    const datum = notes[index];

    return (
      <div
        key={key}
        className={css`
          border: 1px solid lightgrey;
          border-radius: 10px;
          margin: 15px;
        `}
      >
        <NoteListItem data={datum} />
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
