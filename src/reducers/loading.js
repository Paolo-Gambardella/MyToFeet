import {
  LOGIN,
  FORGOT_PASSWORD,
  CHANGE_LOGIN_INFOS,
  LOGOUT,
  SHOW_APP,
  GET_SOLE_IP,
  FETCH_SIMULATION,
  FETCH_SOLE,
  SEND_DATA,
  LAUNCH_ML,
  GET_ANALYSIS_HISTORY,
  resultOf,
  errorOf,
} from '../constants';

const initialState = {
  login: false,
  forgotPassword: false,
  changeLoginInfos: false,
  showApp: false,
  fetchData: false,
  sendData: false,
  launchMl: false,
  getAnalysisHistory: false,
  getSoleIp: false,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT: {
      return {
        ...initialState,
      };
    }
    case LOGIN: {
      return {
        ...state,
        login: true,
      };
    }
    case errorOf(LOGIN):
    case resultOf(LOGIN): {
      return {
        ...state,
        login: false,
      };
    }
    case FORGOT_PASSWORD: {
      return {
        ...state,
        forgotPassword: true,
      };
    }
    case errorOf(FORGOT_PASSWORD):
    case resultOf(FORGOT_PASSWORD): {
      return {
        ...state,
        forgotPassword: false,
      };
    }
    case CHANGE_LOGIN_INFOS: {
      return {
        ...state,
        changeLoginInfos: true,
      };
    }
    case errorOf(CHANGE_LOGIN_INFOS):
    case resultOf(CHANGE_LOGIN_INFOS): {
      return {
        ...state,
        changeLoginInfos: false,
      };
    }
    case errorOf(SHOW_APP):
    case resultOf(SHOW_APP): {
      return {
        ...state,
        showApp: true,
      };
    }
    case GET_SOLE_IP: {
      return {
        ...state,
        getSoleIp: true,
      };
    }
    case errorOf(GET_SOLE_IP):
    case resultOf(GET_SOLE_IP): {
      return {
        ...state,
        getSoleIp: false,
      }
    }
    case FETCH_SIMULATION:
    case FETCH_SOLE: {
      return {
        ...state,
        fetchData: true,
      };
    }
    case errorOf(FETCH_SIMULATION):
    case resultOf(FETCH_SIMULATION):
    case errorOf(FETCH_SOLE):
    case resultOf(FETCH_SOLE): {
      return {
        ...state,
        fetchData: false,
      };
    }
    case SEND_DATA: {
      return {
        ...state,
        sendData: true,
      };
    }
    case errorOf(SEND_DATA):
    case resultOf(SEND_DATA): {
      return {
        ...state,
        sendData: false,
      };
    }
    case LAUNCH_ML: {
      return {
        ...state,
        launchMl: true,
      };
    }
    case errorOf(LAUNCH_ML):
    case resultOf(LAUNCH_ML): {
      return {
        ...state,
        launchMl: false,
      };
    }
    case GET_ANALYSIS_HISTORY: {
      return {
        ...state,
        getAnalysisHistory: true,
      };
    }
    case errorOf(GET_ANALYSIS_HISTORY):
    case resultOf(GET_ANALYSIS_HISTORY): {
      return {
        ...state,
        getAnalysisHistory: false,
      };
    }
    default:
      return state;
  }
};

export default loading;
