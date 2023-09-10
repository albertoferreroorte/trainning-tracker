import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { addNewEmptyStudentWithNamePosition } from '../../store';
import { StudentFormData } from '../entities';
import { Student } from '../entities/student';
import { AddStudentForm } from './add-student-form';
import { StudentsList } from './students-list';

const initialForm: StudentFormData = {
  fullName: '',
  jobPosition: '',
};

export const StudentsPage: React.FC = () => {

  const selected = useAppSelector(state => state.student.selected);
  const students = useAppSelector(state => state.student.students);
  const dispatch = useAppDispatch();

  const onAddStudentHandler = (name: string, position: string) => {
    const studentInstance = new Student(name, position);
    const studentObject = studentInstance.toObject();
    dispatch(addNewEmptyStudentWithNamePosition(studentObject));
  };

  return (
    <ColumnLayout>
      <Box sx={{ p: { md: 3 }, mt: 1 }}>
        <Typography variant="h2" component='h4'>Create student</Typography>
        <AddStudentForm
          initialForm={ initialForm }
          onAddStudent={ onAddStudentHandler }
        />
      </Box>
      <ColumnLayout>
        <Box sx={{ p: { md: 3 }, mb: 3 }}>
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
          selected?.id ? (
            <ColumnLayout>
              <Box sx={{ flexGrow: 1, p: 5 }}>
                <Typography variant="h2" component='h4'>{ selected.fullName }</Typography>
              </Box>
            </ColumnLayout>
          ) : ''
        }
      </ColumnLayout>
    </ColumnLayout>
  );
}