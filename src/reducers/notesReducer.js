/**
 * {
 *      notes: []
 *      active: {
 *          id: 'mkaksamdklasmdkladm'
 *          title: '',
 *          body: '',
 *          imageUrl: '',
 *       }
 * }
 */

import { types } from '../types/types';

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };
    case types.notesActive:
      return {
        ...state,
        active: {
          // usamos spread para romper la relacion
          ...action.payload,
        },
      };
    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    default:
      return state;
  }
};
