import { call, takeLatest, put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  actionGetTodos,
  actionPostTodo,
  actionDeleteTodo,
  actionToggleTodo,
  ActionWithPayload,
  actionEditTextTodo,
  actionGetItemsTodo,
} from './actions';
import { Todo, setTodos, requestTodos, createTodo, removeTodo, editTodo } from './todosSlice';

function* getTodos() {
  yield put(requestTodos());
  const url = 'https://624d5b1cc172b69d69319d83.mockapi.io/api/v1/todo';

  const { data }: AxiosResponse<Array<Todo>> = yield call(axios.get, url);

  yield put(setTodos(data));
}

function* getTodoItems(action: any) {
  const { id } = action.payload;
  yield put(requestTodos());
  const url = `https://624d5b1cc172b69d69319d83.mockapi.io/api/v1/todo/${id}/items`;

  const { data }: AxiosResponse<Array<Todo>> = yield call(axios.get, url);

  yield put(setTodos(data));
}

function* postTodo(action: any) {
  const data = action.payload.value;
  const url = 'https://624d5b1cc172b69d69319d83.mockapi.io/api/v1/todo';

  yield axios.post(url, {
    text: data,
    completed: false,
    id: '',
  });

  yield put(createTodo(data));
}

function* deleteTodo(action: ActionWithPayload<Todo>) {
  const { id } = action.payload;
  const url = `https://624d5b1cc172b69d69319d83.mockapi.io/api/v1/todo/${id}`;

  yield axios.delete(url);

  yield put(removeTodo(id));
}

function* updateTodo(action: ActionWithPayload<Todo>) {
  const { payload } = action;

  const url = `https://624d5b1cc172b69d69319d83.mockapi.io/api/v1/todo/${payload.id}`;
  const body = { text: payload.title };
  yield axios.put(url, body);

  yield put(editTodo(payload));
}

export function* todosSaga() {
  yield takeLatest(actionGetTodos.type, getTodos);
  yield takeLatest(actionGetItemsTodo.type, getTodoItems);
  yield takeLatest(actionPostTodo.type, postTodo);
  yield takeLatest(actionDeleteTodo.type, deleteTodo);
  yield takeLatest([actionToggleTodo.type, actionEditTextTodo.type], updateTodo);
}
