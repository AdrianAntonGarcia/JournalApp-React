import { createStore, combineReducers } from 'redux';
import { authReducer } from '../reducers/authReducer';

// La propiedad auth es manejada por el reducer authReducer
const reducers = combineReducers({
  auth: authReducer,
});
// Solo podemos enviar un reducer, por eso tenemos que usar el combine reducers
export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Esta instrucción es para habilitar las devtools en el navegador
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()