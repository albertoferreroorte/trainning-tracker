import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { StudentsPage } from './student/components/students-page';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StudentsPage />
  </React.StrictMode>,
)
