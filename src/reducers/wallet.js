// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SEND_CURRENCIES, SEND_EXPENSE, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SEND_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== Number(action.payload)),
    };
  default:
    return state;
  }
}

export default walletReducer;
