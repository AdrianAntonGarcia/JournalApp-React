import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes } from '../actions/notes';

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      /**
       * Si no estamos autenticados el user viene null
       */
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        //Cargamos las notas del usuario

        /**
         * Se podría hacer un selector que lea el uid del state,
         * estar pendiente de cuándo cambie con el useEffect y
         * crargar las notas ahí
         */
        const notes = await loadNotes(user.uid);
        dispatch(setNotes(notes));
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <h1>Wait...</h1>;
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isLoggedIn={isLoggedIn}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            isLoggedIn={isLoggedIn}
            exact
            path="/"
            component={JournalScreen}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
