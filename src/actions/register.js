import { REGISTER, resultOf, errorOf } from '../constants';
import client from '../utils/Axios';
import { login } from './login';

/* eslint-disable import/prefer-default-export */
export const register = (lastname, firstname, email, password) => dispatch => {
  dispatch({ type: REGISTER });
  const params = {
    firstname,
    lastname,
    email,
    password,
  };

  return client
    .post('/signup', params)
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: resultOf(REGISTER), data: response.data });
        dispatch(login(email, password));
      }
    })
    .catch(error => {
      dispatch({ type: errorOf(REGISTER), error: error.response.data });
    });
};
