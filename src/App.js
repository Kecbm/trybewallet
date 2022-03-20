import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

const appStyle = {
  backgroundColor: 'rgb(43, 42, 51)',
  borderRadius: '20px',
  margin: '10px',
  padding: '20px',
  marginTop: '10px',
  width: '1250px',
  height: '565px',
};

const titleStyle = {
  textAlign: 'center',
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: '22px',
};

class App extends React.Component {
  render() {
    return (
      <div
        style={ appStyle }
      >
        <div
          style={ titleStyle }
        >
          <h1>Trybewallet</h1>
        </div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/carteira" component={ Wallet } />
        </Switch>
      </div>
    );
  }
}

export default App;
