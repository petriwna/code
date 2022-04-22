import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Todos.css';
import { Todo, initialState } from './todosSlice';
import { actionGetItemsTodo, actionGetTodos } from './actions';
import TodosForm from './component/TodosForm';

export const RootState = { todosState: initialState };

export default function Todos() {
  const todos = useSelector<typeof RootState, Array<Todo>>((state) => state.todosState.todos);
  const [isNoteCreate, setNoteCreate] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actionGetTodos());
  }, [dispatch]);

  function handleStartTyping(): void {
    if (!isNoteCreate) {
      setNoteCreate(true);
    }
  }

  function handleEndTyping(): void {
    setNoteCreate(false);
  }

  return (
    <div className="todo-app">
      <h2 className="title">Todos</h2>
      <div className="content">
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <TodosForm isTyping={isNoteCreate} clicked={handleStartTyping} endTyping={handleEndTyping} />

        <div className="todo-sticker">
          {todos.map((todo) => {
            const { id, title } = todo;

            return (
              <li key={id} className="todo-item">
                <p>{title}</p>
                {/* <input */}
                {/*   type="checkbox" */}
                {/*   defaultChecked={completed} */}
                {/*   onClick={() => { */}
                {/*     // @ts-ignore */}
                {/*     dispatch(actionToggleTodo({ id, text, completed: !completed })); */}
                {/*   }} */}
                {/* /> */}
                {/* <span style={{ textDecoration: completed ? 'line-through' : 'initial' }}>{text}</span> */}
                {/* <input */}
                {/*   type="button" */}
                {/*   value="x" */}
                {/*   onClick={() => { */}
                {/*     // @ts-ignore */}
                {/*     dispatch(actionDeleteTodo(id)); */}
                {/*   }} */}
                {/* /> */}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
}
