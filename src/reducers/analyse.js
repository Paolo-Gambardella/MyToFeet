import {
  GET_SOLE_IP,
  FETCH_SOLE,
  FETCH_SIMULATION,
  LAUNCH_ML,
  GET_ANALYSIS_HISTORY,
  resultOf,
} from '../constants';

const initialState = {
  infos: null,
  showWelcome: false,
};

const analyse = (state = initialState, action) => {
  switch (action.type) {
    case resultOf(GET_SOLE_IP): {
      return {
        ...state,
        soleIp: action.data,
      };
    }
    case resultOf(FETCH_SOLE): {
      return {
        ...state,
        dataWalk: action.data,
      };
    }
    case resultOf(FETCH_SIMULATION): {
      return {
        ...state,
        dataWalk: action.data,
      };
    }
    case resultOf(LAUNCH_ML): {
      return {
        ...state,
        resultML: action.result,
      };
    }
    case resultOf(GET_ANALYSIS_HISTORY): {
      return {
        ...state,
        history: action.data,
      };
    }
    default:
      return state;
  }
};

export default analyse;
