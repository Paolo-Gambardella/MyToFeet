import { NavigationActions } from 'react-navigation';
import client from '../utils/Axios';
import {
  SHOW_WELCOME_SCREEN,
  HIDE_WELCOME_SCREEN,
  CHANGE_LOGIN_INFOS,
  ERROR_VALIDATE_LOGIN_INFOS,
  CHANGE_PASSWORD,
  SHOW_APP,
  resultOf,
  errorOf,
} from '../constants';

export const showWelcomeScreen = () => dispatch => {
  dispatch({ type: SHOW_WELCOME_SCREEN });
};

export const hideWelcomeScreen = () => dispatch => {
  dispatch({ type: HIDE_WELCOME_SCREEN });
};
export const changeLoginInfos = (firstname, lastname, email) => dispatch => {
  dispatch({ type: CHANGE_LOGIN_INFOS });
  const params = {
    firstname,
    lastname,
    email,
  };

  return client
    .put(`/account`, params)
    .then(response => {
      dispatch({
        type: resultOf(CHANGE_LOGIN_INFOS),
        data: response.data,
      });
      dispatch(NavigationActions.back());
    })
    .catch(error => {
      dispatch({ type: errorOf(CHANGE_LOGIN_INFOS), error });
    });
};

export const changePassword = password => dispatch => {
  dispatch({ type: CHANGE_PASSWORD });
  const params = {
    password,
  };

  return client
    .patch('/password', params)
    .then(() => {
      dispatch({ type: resultOf(CHANGE_PASSWORD) });
      dispatch(NavigationActions.back());
    })
    .catch(error => {
      dispatch({ type: errorOf(CHANGE_PASSWORD), error });
    });
};

export const errorValidateLoginInfos = message => dispatch => {
  dispatch({ type: ERROR_VALIDATE_LOGIN_INFOS, message });
};

export const showApp = () => dispatch => {
  dispatch({ type: SHOW_APP });
  setTimeout(() => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'Logged',
      })
    );
  }, 2000);
};
