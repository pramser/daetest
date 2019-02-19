// Dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Components
import Header from './components/header';
import Dashboard from './components/dashboard';
import Tests from './components/tests/tests';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes />
      </div>
    );
  }
}

const Routes = () => (
  <div className="App-content">
    <Route exact path="/" component={Dashboard} />
    <Route path="/tests" component={Tests} />
  </div>
);

export default App;
