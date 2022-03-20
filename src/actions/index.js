// Coloque aqui suas actions
export const SEND_USER = 'SEND_USER';
export const SEND_CURRENCIES = 'SEND_CURRENCIES';
export const SEND_EXPENSE_ERROR = 'SEND_EXPENSE_ERROR';
export const SEND_EXPENSE = 'SEND_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const addUser = (user) => ({
  type: SEND_USER,
  payload: user,
});

export const addCurrencies = (currencies = {}) => ({
  type: SEND_CURRENCIES,
  payload: currencies,
});

export const addExpense = (expense) => ({
  type: SEND_EXPENSE,
  payload: expense,
});

export const addExpenseError = (expense) => ({
  type: SEND_EXPENSE_ERROR,
  payload: expense,
});

const ENDPOINT_API = 'https://economia.awesomeapi.com.br/json/all';

export const getCurrencies = async () => {
  const response = await fetch(ENDPOINT_API);
  const json = await response.json();

  return json;
};

export const fetchCurrenciesThunk = () => (dispatch) => getCurrencies()
  .then((response) => {
    dispatch(addCurrencies(response));
  })
  .catch((error) => {
    dispatch(addExpenseError(error));
  });

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  payload: expense,
});
