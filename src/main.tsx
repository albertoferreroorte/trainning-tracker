import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { store } from './store/store';
import { StudentProvider } from './student/context';
import { TrainningTrackerApp } from './trainning-tracker-app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={ store }>
      <StudentProvider>
        <BrowserRouter>
          <TrainningTrackerApp />
        </BrowserRouter>
      </StudentProvider>
    </Provider>
  </React.StrictMode>,
)
