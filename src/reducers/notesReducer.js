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
    case types.notesActive:
      return {
        ...state,
        active: {
          // usamos spread para romper la relacion
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
