import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { ColumnLayout } from '../../shared/layout/column-layout';
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
    <ColumnLayout
      fullWidthChildren={
        <Box
          sx={{
            maxWidth: 1280,
          }}
        >
          <Typography
            component='h3'
            variant="h2"
            sx={{ my: 3 }}
          >
            {
              !students.length ? (
                <Box sx={{ mr: 3, opacity: 0.75 }}>No</Box>
              ) : ''
            }
            Students
          </Typography>
          {
            students.length ? (
              <StudentsList students={ students } />
            ) : ''
          }
        </Box>
      }
    >
      <Grid
        container
        sx={{ width: '100%' }}
      >
        <Typography variant="h2" component='h4'>Create student</Typography>
        <Divider />
        <StudentForm
          initialForm={ initialForm }
          onAddStudent={ onAddStudentHandler }
        />
      </Grid>
    </ColumnLayout>
  );
}