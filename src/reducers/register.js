import { REGISTER, resultOf } from '../constants';

const initialState = {};

const register = (state = initialState, action) => {
  switch (action.type) {
    case resultOf(REGISTER): {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default register;
