import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addExpense, fetchCurrenciesThunk, getCurrencies,
  addExpenseError } from '../actions/index';
import Table from '../components/Table';

const walletStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  textAlign: 'center',
  fontFamily: 'sans-serif',
  fontSize: '16px',
  backgroundColor : 'rgb(28, 27, 34)',
  borderRadius: '10px',
  margin: '40px',
  padding: '10px',
};

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: 'Dez dólares',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Lazer',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesThunk());
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  async handleClick() {
    const { value, id, currency, description, method, tag, exchangeRates } = this.state;
    console.log(exchangeRates);
    const { dispatch } = this.props;
    this.setState(() => ({
      value: '',
      id: id + 1,
      currency: 'EUR',
      description: '',
      method: '',
      tag: '',
    }));
    try {
      const data = await getCurrencies();
      dispatch(addExpense({ value,
        id,
        currency,
        description,
        method,
        tag,
        exchangeRates: data }));
    } catch (error) {
      dispatch(addExpenseError);
    }
  }

  render() {
    const {
      currencies,
    } = this.props;

    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <div>
        <Header />
        <div
          style={ walletStyle }
        >
          <form>
            <label htmlFor="value">
              Valor
              <input
                type="number"
                name="value"
                data-testid="value-input"
                id="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <input
                type="text"
                name="description"
                data-testid="description-input"
                id="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="currency">
              Moeda
              { Object.keys(currencies).length > 0 && (
                <select
                  data-testid="currency-input"
                  name="currency"
                  id="currency"
                  value={ currency }
                  onChange={ this.handleChange }
                  key={ id }
                >
                  {
                    Object.keys(currencies)
                      .filter((coin) => coin !== 'USDT').map((coin) => (
                        <option
                          value={ coin }
                          data-testid={ coin }
                          key={ coin }
                        >
                          { coin }
                        </option>
                      ))
                  }
                </select>
              )}
            </label>
            <label htmlFor="method">
              Pagamento
              <select
                data-testid="method-input"
                name="method"
                id="method"
                value={ method }
                onChange={ this.handleChange }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="tag">
              <select
                data-testid="tag-input"
                name="tag"
                id="tag"
                value={ tag }
                onChange={ this.handleChange }
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar
            </button>
          </form>
        </div>
        <Table />
      </div>);
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
