import React, { useEffect, useRef } from 'react';
import { NotesAppBar } from './NotesAppBar';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  /**
   * Una vez establecemos el estado en el useState, el estado hay que cambiarlo
   * con el handleInputChange, no se va a redefinir porque lo llamemos otra vez
   */
  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title } = formValues;

  /**
   * El note cambia cada vez que cambia el store, por lo que almacenamos el valor actual
   * con el useRef para mantener una referncia del valor anterior y solo lo cambiamos
   * cuándo sea distinto.
   */
  const activeId = useRef(note.id);
  // console.log(formValues);
  // console.log(note);
  // console.log(activeId);
  // activeId.current = note.id;
  // console.log(activeId);
  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes_title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="What happened today?"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img
              src="https://www.tom-archer.com/wp-content/uploads/2018/06/milford-sound-night-fine-art-photography-new-zealand.jpg"
              alt="Imagen"
            />
          </div>
        )}
      </div>
    </div>
  );
};
