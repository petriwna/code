/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export type Todo = { id: string; title: string };
export type TodoState = {
  isLoading: boolean;
  todos: Array<Todo>;
  visibilityFilter: string;
};

export const initialState: TodoState = {
  isLoading: false,
  todos: [],
  visibilityFilter: 'SHOW_COMPLETED',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    requestTodos(state) {
      state.isLoading = !state.isLoading;
    },
    setTodos(state, { payload }) {
      state.todos = payload;
    },
    createTodo(state, { payload }) {
      const id = parseInt(state.todos[state.todos.length - 1].id, 10) + 1;
      state.todos.push({ title: payload, id: id.toString() });
    },
    removeTodo(state, { payload }) {
      state.todos = state.todos.filter(({ id }) => id !== payload);
    },
    editTodo(state, { payload }) {
      state.todos.forEach((todo) => {
        if (todo.id === payload.id) {
          todo.title = payload.text;
        }
      });
    },
    // deleteTodo(state) {
    //   state.todos = state.todos.filter(({ completed }) => !completed);
    // },
  },
});

const { createTodo, removeTodo, setTodos, requestTodos, editTodo } = todosSlice.actions;

export { createTodo, removeTodo, setTodos, requestTodos, editTodo };
