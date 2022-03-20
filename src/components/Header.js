import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const headerStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
  fontFamily: 'sans-serif',
  fontSize: '22px',
  backgroundColor: 'rgb(28, 27, 34)',
  borderRadius: '10px',
  width: '1240px',
  height: '50px',
  padding: '7px',
};

class Header extends Component {
  render() {
    const {
      email,
      expenses,
    } = this.props;
    const totalValue = expenses.reduce((acc, expense) => {
      acc
      += (Number(expense.value).toFixed(2)
      * expense.exchangeRates[expense.currency].ask);
      return acc;
    }, 0);

    return (
      <div
        style={ headerStyle }
      >
        <p data-testid="email-field">
          👤
          {' '}
          { email }
        </p>
        <p data-testid="total-field">
          💵
          {' '}
          { totalValue.toFixed(2) }
        </p>
        <p data-testid="header-currency-field">
          🏦
          {' '}
          BRL
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
