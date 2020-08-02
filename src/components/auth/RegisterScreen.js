import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state.ui;
  });
  const msgError = state.msgError;
  const loading = state.loading;

  const initialFormValues = {
    name: 'Adrian',
    email: 'adrtler@gmail.com',
    password: '123456',
    password2: '123456',
  };
  const [formValues, handleInputChange] = useForm(initialFormValues);
  const { name, email, password, password2 } = formValues;
  const handleRegister = (e) => {
    e.preventDefault();
    // console.log(name, email, password, password2);
    if (isFormValid()) {
      // console.log('Formulario correcto');
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if (password !== password2 || password.length < 6) {
      dispatch(
        setError(
          'Password should be at least 6 characters and match each other'
        )
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };
  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister} autoComplete="off" className="animate__animated animate__fadeIn animate__faster">
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          value={name}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          onChange={handleInputChange}
          value={password}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          onChange={handleInputChange}
          value={password2}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
          disabled={loading}
        >
          Register
        </button>
        <Link className="link" to="/auth/login">
          Already register?
        </Link>
      </form>
    </>
  );
};
