import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

// Start MSW worker in development
if (import.meta.env.DEV) {
  const { worker } = await import('#/mocks');
  worker.start();

  // Note: Using localStorage-based communication for development
  // No mock WebSocket server needed - each tab communicates via localStorage
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
