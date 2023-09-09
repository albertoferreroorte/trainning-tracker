import { Route, Routes } from "react-router-dom"
import { StudentsPage } from "../student/components"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="courses" element={ <h1>Courses page</h1>} />
      <Route path="students" element={ <StudentsPage /> } />
      <Route path="/*" element={ <StudentsPage /> } />
    </Routes>
  )
}