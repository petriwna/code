/* eslint-disable no-param-reassign */
import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  CellMeasurer,
  CellMeasurerCache,
  Masonry,
  Size,
  Positioner,
  MasonryCellProps,
  createMasonryCellPositioner,
  AutoSizer,
} from 'react-virtualized';
// eslint-disable-next-line @emotion/no-vanilla
import { css } from '@emotion/css';

import { NoteListItem } from './NoteListItem';
import { actionGetNotes } from './actions';
import { RootState } from '../../store';
import { Note } from './mainSlice';

const cellMeasurerCache = new CellMeasurerCache({ defaultHeight: 250, defaultWidth: 200, fixedWidth: true });

const state = {
  columnWidth: 307,
  height: 300,
  gutterSize: 10,
  overscanByPixels: 0,
};

function BaseMain() {
  const notes = useSelector<RootState, Array<Note>>((s) => s.main.notes, shallowEqual);
  const masonry = React.useRef<Masonry | null>();
  const columnCount = React.useRef(0);
  const size = React.useRef<Size>({ width: 0, height: state.height });
  const cellPositioner = React.useRef<Positioner | null>();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actionGetNotes());
  }, [dispatch]);

  const initCellPositioner = () => {
    if (!cellPositioner.current) {
      cellPositioner.current = createMasonryCellPositioner({
        cellMeasurerCache,
        columnCount: columnCount.current,
        columnWidth: state.columnWidth,
        spacer: state.gutterSize,
      });
    }
  };

  const calculateColumnCount = () => {
    columnCount.current = Math.floor(size.current.width / (state.columnWidth + state.gutterSize));
  };

  const resetCellPositioner = () => {
    if (cellPositioner.current) {
      cellPositioner.current?.reset({
        columnCount: columnCount.current,
        columnWidth: state.columnWidth,
        spacer: state.gutterSize,
      });
    }
  };

  React.useLayoutEffect(() => {
    initCellPositioner();
    calculateColumnCount();

    return () => {
      cellMeasurerCache.clearAll();
      resetCellPositioner();

      if (masonry.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        masonry.current.clearCellPositions();
      }
    };
  }, []);

  const recomputeRowSizes = ({ width }: Size) => {
    size.current.width = width;

    cellMeasurerCache.clearAll();

    if (masonry.current) {
      masonry.current?.clearCellPositions();
    }

    calculateColumnCount();
    resetCellPositioner();

    if (masonry.current) {
      masonry.current.recomputeCellPositions();
    }
  };

  const cellRenderer = ({ index, key, parent, style }: MasonryCellProps) => {
    const data = notes[index];

    return (
      <CellMeasurer cache={cellMeasurerCache} index={index} key={key} parent={parent}>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            border-radius: 0.5rem;
            padding: 10px;
            word-break: break-all;
            margin: 30px 55px;
          `}
          style={{ ...style, width: state.columnWidth }}
        >
          <NoteListItem maxWidth={state.columnWidth} data={data} />
        </div>
      </CellMeasurer>
    );
  };

  return notes.length ? (
    <AutoSizer style={{ height: 'calc(100vh)', width: '100%' }} onResize={recomputeRowSizes}>
      {({ width, height }) => {
        size.current.width = width;
        size.current.height = height;

        return (
          <Masonry
            ref={(ref) => {
              masonry.current = ref;
            }}
            autoHeight={false}
            cellCount={notes.length}
            cellMeasurerCache={cellMeasurerCache}
            // @ts-ignore
            cellPositioner={cellPositioner.current}
            cellRenderer={cellRenderer}
            height={height}
            overscanByPixels={state.overscanByPixels}
            width={width}
          />
        );
      }}
    </AutoSizer>
  ) : (
    <div>...Loading</div>
  );
}

export default React.memo(BaseMain);
