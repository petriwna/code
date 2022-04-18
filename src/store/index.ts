import { Saga } from 'redux-saga';
import { createStore, sagaMiddleware } from './createStore';
import { todosSlice } from '../pages/Todos/todosSlice';
import { todosSaga } from '../pages/Todos/todoSaga';

export const store = createStore({ todosState: todosSlice.reducer });

sagaMiddleware.run(<Saga>todosSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
