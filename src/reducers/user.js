import {
  LOGIN,
  SHOW_WELCOME_SCREEN,
  HIDE_WELCOME_SCREEN,
  CHANGE_LOGIN_INFOS,
  LOGOUT,
  resultOf,
} from '../constants';

const initialState = {
  infos: null,
  showWelcome: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case resultOf(LOGIN): {
      return {
        ...state,
        infos: action.user,
      };
    }
    case SHOW_WELCOME_SCREEN: {
      return {
        ...state,
        showWelcome: true,
      };
    }
    case HIDE_WELCOME_SCREEN: {
      return {
        ...state,
        showWelcome: false,
      };
    }
    case resultOf(CHANGE_LOGIN_INFOS): {
      const tmp = { ...state };

      tmp.infos = Object.assign(tmp.infos, action.data);
      return {
        ...tmp,
      };
    }
    case LOGOUT: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default user;
