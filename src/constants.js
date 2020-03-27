export const LOGIN = 'LOGIN';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const REGISTER = 'REGISTER';
export const LOGOUT = 'LOGOUT';

export const SHOW_APP = 'SHOW_APP';
export const SHOW_WELCOME_SCREEN = 'SHOW_WELCOME_SCREEN';
export const HIDE_WELCOME_SCREEN = 'HIDE_WELCOME_SCREEN';

export const TIMEOUT_CODE = 'ECONNABORTED';

export const CHANGE_LOGIN_INFOS = 'CHANGE_LOGIN_INFOS';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const ERROR_VALIDATE_LOGIN_INFOS = 'ERROR_VALIDATE_LOGIN_INFOS';

export const GET_SOLE_IP = 'GET_SOLE_IP';
export const FETCH_SOLE = 'FETCH_SOLE';
export const FETCH_SIMULATION = 'FETCH_SIMULATION';
export const SEND_DATA = 'SEND_DATA';
export const LAUNCH_ML = 'LAUNCH_ML';
export const MISSING_DATAWALK_ERROR = 'MISSING_DATAWALK_ERROR';
export const GET_ANALYSIS_HISTORY = 'GET_ANALYSIS_HISTORY';

export const errorOf = type => `${type}_ERROR`;
export const resultOf = result => `${result}_RESULT`;
