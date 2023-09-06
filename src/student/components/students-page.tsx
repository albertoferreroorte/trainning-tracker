import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { StudentFormData } from '../entities';
import { Student } from '../entities/student';
import { StudentForm } from './student-form';
import { StudentsList } from './students-list';

const initialForm: StudentFormData = {
  fullName: '',
  jobPosition: '',
};

export const StudentsPage: React.FC = () => {
  const [ students, setStudents ] = useState<Student[]>([]);
  const onAddStudentHandler = (name: string, position: string) => {
    const newStudent = new Student(name, position);
    setStudents(students => students.concat(newStudent));
  }
  return (
    <Grid
      container
      justifyContent='space-around'
      sx={{ padding: 10 }}
    >
      <Grid item>
        <StudentForm
          initialForm={ initialForm }
          onAddStudent={ onAddStudentHandler }
        />
      </Grid>
      <Grid item>
        <StudentsList students={ students } />
      </Grid>
    </Grid>
  );
}