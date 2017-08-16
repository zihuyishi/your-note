import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.count = 0;
  }
  render() {
    return (
      <h1>Hello, now is {new Date().toLocaleTimeString()}.</h1>
    );
  }
}

export default App;
