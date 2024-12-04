import React from 'react';
import logo from './logo.svg';
import './App.css';
import { doSettlement, doCharge,userWallets, getTransactionHistory, showBalance } from './training/final';

function App() {
  try {
    doSettlement(1,1000);
    doSettlement(5,1000);
    doCharge(3,10000);
    console.log("残高出力\n",showBalance(3));
    console.log("取引履歴出力\n",getTransactionHistory(3));
  } catch(e) {
    console.error(e);
  }
  console.log("処理後\n",userWallets);
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
