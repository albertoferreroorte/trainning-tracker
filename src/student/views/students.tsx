import { Box, Typography } from '@mui/material';
import { StudentsList } from '../components';
import { useAppDispatch, useSelectedStudent, useStudents } from '../../shared/hooks';
import { Student } from '../entities';
import { startSelectStudent } from '../../store/student';

export const StudentsView = () => {

  const dispatch = useAppDispatch();

  const { selectedStudentId, students } = useStudents();
  const { selectedStudent } = useSelectedStudent(selectedStudentId ?? 0);

  const handleSelectStudent = (student: Student) => {
    dispatch( startSelectStudent(student.id) );
  }

  return (
    <Box sx={{ p: { md: 3 }, my: 7 }}>
      <Typography
        component='h3'
        variant="h2"
        sx={{ my: 3 }}
      >
        {
          !students?.length && (
            <Typography fontSize={ 30 } sx={{ mr: 3, opacity: 0.75 }}>No</Typography>
          )
        }
        Students
      </Typography>
      {
        students?.length > 0 && (
          <StudentsList
            onSelectStudent={ handleSelectStudent }
            selectedStudent={ selectedStudent ?? null }
            students={ students }
          />
        )
      }
    </Box>
  );
}