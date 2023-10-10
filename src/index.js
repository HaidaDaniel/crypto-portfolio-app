import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider, createTheme } from '@mui/material';
import reportWebVitals from './reportWebVitals';

import { App } from './App';

import client from './apollo/client'
import './index.css';

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
