import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { StudentProvider } from './student/context';
import { TrainningTrackerApp } from './trainning-tracker-app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StudentProvider>
      <BrowserRouter>
        <TrainningTrackerApp />
      </BrowserRouter>
    </StudentProvider>
  </React.StrictMode>,
)
