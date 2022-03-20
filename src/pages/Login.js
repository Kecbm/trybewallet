import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../actions/index';

const loginStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '150px',
  fontFamily: 'monospace',
  fontSize: '20px',
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      botaoDesabilitado: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState(() => ({
      [name]: value,
    }), () => this.verificaForm());
  }

  verificaForm() {
    const {
      email,
      senha,
    } = this.state;
    const validaEmail = /\S+@\S+\.\S+/;
    const emailCorreto = validaEmail.test(email);
    const SENHA = 5;
    const senhaValida = senha.length > SENHA;
    const verificacao = emailCorreto && senhaValida;
    this.setState({
      botaoDesabilitado: !verificacao,
    });
  }

  handleClick() {
    const { history, dispatch } = this.props;
    const {
      email,
    } = this.state;
    dispatch(addUser(email));
    history.push('/carteira');
  }

  render() {
    const {
      email,
      senha,
      botaoDesabilitado,
    } = this.state;
    return (
      <form
        style={ loginStyle }
      >
        <label htmlFor="email-input">
          Email
          <input
            type="email"
            name="email"
            data-testid="email-input"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            type="password"
            name="senha"
            data-testid="password-input"
            id="senha"
            value={ senha }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ botaoDesabilitado }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
