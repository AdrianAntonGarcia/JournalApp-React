import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { startLoading, finishLoading } from './ui';
// Acción asíncrona
/**
 * Acción que dispara otra acción con el dispatch del callback cuándo se resuelve
 * la petición asíncrona. Se pueden hacer varios dispatch
 * @param {*} email
 * @param {*} password
 */

export const startLoginEmailPassword = (email, password) => {
  /**
   * thunk nos retorna el dispatch en el callback
   */
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log({ user });
        dispatch(login(user.user.uid, user.user.displayName));
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(finishLoading());
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        /**
         * Si el usuario no viene de una red social no tiene ni displayname ni foto,
         * se lo podemos añadir con la siguiente función
         */
        await user.updateProfile({ displayName: name });
        // console.log(user);
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(finishLoading());
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};
