import React from 'react';
import { ApolloProvider } from 'react-apollo';
import logo from '../logo.svg';
import client from '../client';
import './App.css';

/**
 * @description The main application component.
 */
const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://marcopeg.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          marcopeg.com
        </a>
      </header>
    </div>
  </ApolloProvider>
);

export default App;
