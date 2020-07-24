import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';

// Para aplicar varios middlewares al store
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// La propiedad auth es manejada por el reducer authReducer
const reducers = combineReducers({
  auth: authReducer,
});
// Solo podemos enviar un reducer, por eso tenemos que usar el combine reducers
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

// Esta instrucción es para habilitar las devtools en el navegador
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()