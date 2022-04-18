import React from 'react';

export default function CreateFormTodos() {
  return (
    <div>
      <div className="container-input">
        <textarea className="container-create textarea" placeholder="Заметка..." />
      </div>
      <div className="container-button">
        <button type="button" className="button-create">
          Сохранить
        </button>
      </div>
    </div>
  );
}
