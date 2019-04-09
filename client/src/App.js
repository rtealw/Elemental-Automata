import React, { Component } from 'react';
import './App.css';
import Toolbox from './components/Toolbox';
import Sandbox from './components/Sandbox.js';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbox />
        <Sandbox size={5} />
      </div>
    );
  }
}

export default App;
