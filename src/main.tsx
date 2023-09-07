import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { StudentsPage } from './student/components';
import { StudentProvider } from './student/context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StudentProvider>
      <StudentsPage />
    </StudentProvider>
  </React.StrictMode>,
)
