import { types } from '../types/types';

/**
 *  Reducer que se encarga de manejar las acciones del login
 * @param {*} state Va a estar vacio cuando no esté autenticado,
 * {
 *  uid: 'admkldmksam123'
 *  name: 'Adrian'
 * }
 * @param {*} action
 */

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};
