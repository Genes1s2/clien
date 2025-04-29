import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import AuthLoader from './components/AuthLoader';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './utils/ErrorLogging';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthLoader>
            <Toaster />
            <App />
          </AuthLoader>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
