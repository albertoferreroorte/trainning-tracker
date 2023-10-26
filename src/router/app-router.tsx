import { Route, Routes } from 'react-router-dom';
import { CoursesPage } from '../course/pages/courses-page';
import { StudentsPage } from '../student/pages/students-page';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="courses" element={ <CoursesPage /> } />
      <Route path="students" element={ <StudentsPage /> } />
      <Route path="/*" element={ <CoursesPage /> } />
    </Routes>
  )
}