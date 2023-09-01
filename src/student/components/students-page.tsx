import { useState } from 'react';
import { Student } from '../entities/student';
import { StudentForm } from './student-form';
import { StudentsList } from './students-list';

export const StudentsPage: React.FC = () => {
  const [ students, setStudents ] = useState<Student[]>([]);
  const onAddStudentHandler = (name: string, position: string) => {
    const newStudent = new Student(name, position);
    setStudents(students => students.concat(newStudent));
  }
  return (
    <>
      <StudentForm onAddStudent={ onAddStudentHandler } />
      <hr />
      <StudentsList students={ students } />
    </>
  );
}