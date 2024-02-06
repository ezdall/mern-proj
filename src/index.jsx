import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
//
import { store } from './api/store';
// comp
import App from './App';
import ErrorBoundary from './components/error-boundary.comp';
// style
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
