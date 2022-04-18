import React, { useEffect, useRef } from 'react';

import './TodosForm.css';
import CreateInput from './CreateInput';
import CreateNote from './CreateNote';

export default function TodosForm({
  isTyping,
  clicked,
  endTyping,
}: {
  isTyping: boolean;
  clicked: any;
  endTyping: any;
}) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.addEventListener('click', handleClickOutside);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window.removeEventListener('click', () => {});
    };
  });

  // function handleCloseForm(): void {
  //   endTyping();
  // }

  function handleClickOutside(event: MouseEvent): void {
    // @ts-ignore
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      endTyping();
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
    <div className="container" id="container" onClick={clicked} ref={wrapperRef}>
      {!isTyping ? <CreateInput /> : <CreateNote />}
    </div>
  );
}
