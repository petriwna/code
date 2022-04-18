import React from 'react';
import { FaRegCheckSquare } from 'react-icons/fa';
import CreateFormTodos from './CreateFormTodos';

export default function CreateInput() {
  return (
    <div className="container-input">
      <span className="container-span">Заметка...</span>
      {/* <input */}
      {/*   value={value} */}
      {/*   type="text" */}
      {/*   onChange={(event) => { */}
      {/*     setValue(event.currentTarget.value); */}
      {/*   }} */}
      {/*   onKeyPress={(event) => { */}
      {/*     if (event.key === 'Enter' && value) { */}
      {/*       // @ts-ignore */}
      {/*       dispatch(actionPostTodo(value)); */}
      {/*       setValue(''); */}
      {/*     } */}
      {/*   }} */}
      {/* /> */}
      {/* <button */}
      {/*   type="button" */}
      {/*   onClick={() => { */}
      {/*     if (value) { */}
      {/*       // @ts-ignore */}
      {/*       dispatch(actionPostTodo({ value })); */}
      {/*       setValue(''); */}
      {/*     } */}
      {/*   }} */}
      {/* > */}
      {/*   Create */}
      {/* </button> */}
      <button
        type="button"
        className="button"
        onClick={() => {
          <CreateFormTodos />;
        }}
      >
        <FaRegCheckSquare size="1.5em" />
      </button>
    </div>
  );
}
