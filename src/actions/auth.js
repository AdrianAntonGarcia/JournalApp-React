import { types } from '../types/types';


// Acción asíncrona
/**
 * Acción que dispara otra acción con el dispatch del callback cuándo se resuelve
 * la petición asíncrona. Se pueden hacer varios dispatch
 * @param {*} email 
 * @param {*} password 
 */

export const startLoginEmailPassword = (email, password) =>{
  /**
   * thunk nos retorna el dispatch en el callback
   */
  return (dispatch) =>{
    setTimeout(() => {
      dispatch(login(123,'Pedro'));
    }, 3500);
  }
}


export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
