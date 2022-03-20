import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions/index';

const TableStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
  fontFamily: 'sans-serif',
  backgroundColor: 'rgb(28, 27, 34)',
  margin: '40px',
};

class Table extends React.Component {
  handleClick = (event) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(event.target.id));
  }

  render() {
    const {
      expenses,
    } = this.props;

    return (
      <div
        style={ TableStyle }
      >
        <table
          border="1"
        >
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ Number(expense.value).toFixed(2) }</td>
                  <td>
                    {
                      expense.exchangeRates[expense.currency]
                        .name
                    }
                  </td>
                  <td>
                    {
                      Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                    }
                  </td>
                  <td>
                    { Number(expense.value
        * expense.exchangeRates[expense.currency].ask).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      id={ expense.id }
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.handleClick }
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
