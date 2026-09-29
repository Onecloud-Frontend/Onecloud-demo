import React from 'react';
import ReactDOM from 'react-dom/client';
import '@styles/globals.css';
import { AppProviders } from '@app/providers/AppProviders';
import { AppRouter } from '@app/router/routes';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element in index.html');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </React.StrictMode>
);
