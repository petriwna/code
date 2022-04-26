import { Saga } from 'redux-saga';

import { createStore, sagaMiddleware } from './createStore';
import { mainSlice } from '../pages/Main/mainSlice';
import { mainSaga } from '../pages/Main/mainSaga';

export const store = createStore({ main: mainSlice.reducer });

sagaMiddleware.run(<Saga>mainSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
