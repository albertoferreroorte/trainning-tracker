import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { TrainningTrackerApp } from './trainning-tracker-app';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <TrainningTrackerApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
