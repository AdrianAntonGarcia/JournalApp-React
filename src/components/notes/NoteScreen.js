import React, { useEffect, useRef } from 'react';
import { NotesAppBar } from './NotesAppBar';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  /**
   * Una vez establecemos el estado en el useState, el estado hay que cambiarlo
   * con el handleInputChange, no se va a redefinir porque lo llamemos otra vez.
   * No podemos mutar el estado de forma directa!!!!
   */
  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title, id } = formValues;

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
      // Cambio de la nota por que el usuario ha clicado otra
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting(id));
  };

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
          name="title"
          onChange={handleInputChange}
        />
        <textarea
          placeholder="What happened today?"
          className="notes__textarea"
          value={body}
          name="body"
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="Imagen" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
