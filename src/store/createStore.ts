import { configureStore, Reducer } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { reduxBatch } from '@manaflair/redux-batch';

export const sagaMiddleware = createSagaMiddleware();

export function createStore(reducer: Record<string, Reducer>) {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: true }).concat(sagaMiddleware, logger),
    devTools: true,
    enhancers: [reduxBatch],
  });
}
