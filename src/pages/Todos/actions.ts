import { Action, createAction } from '@reduxjs/toolkit';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export const actionGetTodos = createAction('todos/getAll');

export const actionPostTodo = createAction('todos/addTodo');

export const actionDeleteTodo = createAction('todos/deleteTodo');

export const actionEditTodo = createAction('todos/editTodo');

export const actionToggleTodo = createAction('todos/toggle');

export const actionEditTextTodo = createAction('todos/editText');
