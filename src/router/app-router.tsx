import { Route, Routes } from "react-router-dom"
import { CoursesPage } from "../course/components"
import { StudentsPage } from "../student/components"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="courses" element={ <CoursesPage /> } />
      <Route path="students" element={ <StudentsPage /> } />
      <Route path="/*" element={ <CoursesPage /> } />
    </Routes>
  )
}