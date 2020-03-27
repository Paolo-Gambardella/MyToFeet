/* eslint-disable import/prefer-default-export */
import { NavigationActions, StackActions } from 'react-navigation';
import client from '../utils/Axios';
import {
  LOGIN,
  FORGOT_PASSWORD,
  LOGOUT,
  resultOf,
  errorOf,
} from '../constants';
import { storeLogin } from '../utils/LocalStorage'

export const login = (email, password) => dispatch => {
  dispatch({ type: LOGIN });
  const params = {
    email,
    password,
  };
  return client
    .post('/login', params)
    .then(response => {
      storeLogin('login', { email });
      dispatch({ type: resultOf(LOGIN), user: response.data });
      dispatch(
        NavigationActions.navigate({
          routeName: 'Welcome',
        })
      );
    })
    .catch(error => {
      dispatch({ type: errorOf(LOGIN), error: error.response.data });
    });
};

export const forgotPassword = email => dispatch => {
  dispatch({ type: FORGOT_PASSWORD });
  const params = {
    email,
  };

  return client
    .post('/recovery_email', params)
    .then(response => {
      dispatch({ type: resultOf(FORGOT_PASSWORD), data: response.data });
      dispatch(
        NavigationActions.navigate({
          routeName: 'Main',
        })
      );
    })
    .catch(error => {
      dispatch({ type: errorOf(FORGOT_PASSWORD), error });
    });
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  client.get('/logout');
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'NotLogged' })],
  });
  dispatch(resetAction);
};
