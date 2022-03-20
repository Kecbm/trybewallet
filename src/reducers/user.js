// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SEND_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_USER:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default userReducer;
