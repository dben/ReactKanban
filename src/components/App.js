import React, { Component } from 'react';
import Board from './Board';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Welcome to React Kanban</h1>
        </div>
        <Board />
      </div>
    );
  }
}

export default App;
