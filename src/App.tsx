import React from 'react';
import logo from './logo.svg';
import './App.css';
import { doSettlement, userWallet } from './training/final';

function App() {
  doSettlement(1,1000);
  doSettlement(3,1000);
  console.log(userWallet);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
