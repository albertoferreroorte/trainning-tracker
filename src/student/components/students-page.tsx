import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { Student } from '../entities/student';
import { StudentForm } from './student-form';
import { StudentsList } from './students-list';

const initialForm: Record<string, string> = {
  fullName: 'Full name',
  jobPosition: 'Job position',
};

export const StudentsPage: React.FC = () => {
  const [ students, setStudents ] = useState<Student[]>([]);
  const onAddStudentHandler = (data: Record<string, string>) => {
    const newStudent = new Student(data.fullName, data.jobPosition);
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