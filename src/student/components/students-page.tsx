import { Box, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { StudentContextType, useStudentContext } from '../context';
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
  const { selectedStudent }: StudentContextType = useStudentContext();
  const onAddStudentHandler = (name: string, position: string) => {
    const newStudent = new Student(name, position);
    setStudents(students => [
      ...students,
      newStudent,
    ]);
  }
  return (
    <ColumnLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h2" component='h4'>Create student</Typography>
        <Divider />
        <StudentForm
          initialForm={ initialForm }
          onAddStudent={ onAddStudentHandler }
        />
      </Box>
      <ColumnLayout>
        <Box sx={{ p: 3, mb: 3 }}>
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
        {
          selectedStudent ? (
            <ColumnLayout>
              <Box sx={{ flexGrow: 1, p: 5 }}>
                <Typography variant="h2" component='h4'>{ selectedStudent }</Typography>
              </Box>
            </ColumnLayout>
          ) : ''
        }
      </ColumnLayout>
    </ColumnLayout>
  );
}