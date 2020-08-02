import { db } from '../firebase/firebase-config';

import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import Swal from 'sweetalert2';
import { wait } from '@testing-library/react';
import { fileUpload } from '../helpers/fileUpload';

//react-journal

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };
    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(startLoadingNotes(uid));
    dispatch(addNewNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: [...notes],
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    /**
     * Si la url viene undfined, no vamos a poder grabar en
     * la base de datos porque no los acepta
     */
    if (!note.url) {
      delete note.url;
    }
    const noteToFirestore = { ...note };
    // El id no lo vamos a guardar en la nota de firestore, ya es el identificador del nodo
    delete noteToFirestore.id;

    try {
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    } catch (err) {
      Swal.fire('Error', 'Error en el guardado en firebase', 'error');
      return;
    }
    /**
     * Actualizamos solo la nota que hemos modificado
     */
    dispatch(refreshNote(note.id, noteToFirestore));
    Swal.fire('Saved', note.title, 'success');
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl.secure_url;
    activeNote.public_id = fileUrl.public_id;

    dispatch(startSaveNote(activeNote));
    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    try {
      // Borramos de firebase
      await db.doc(`${uid}/journal/notes/${id}`).delete();
      // Borramos de redux
      dispatch(deleteNote(id));
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'Error deleting note firebase', 'error');
    }
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
