import { Box } from '@mui/material';
import { StudentsList } from '../components';
import { useAppDispatch, useSelectedStudent, useStudents } from '../../shared/hooks';
import { Student } from '../entities';
import { startSelectStudent } from '../../store/student';
import { SectionTitleComponent } from '../../shared/components';

export const StudentsView = () => {

  const dispatch = useAppDispatch();

  const { selectedStudentId, students } = useStudents();
  const { selectedStudent } = useSelectedStudent(selectedStudentId ?? 0);

  const handleSelectStudent = (student: Student) => {
    dispatch( startSelectStudent(student.id) );
  }

  return (
    <Box sx={{ p: { md: 3 }, my: 7 }}>
      <SectionTitleComponent
        length={ students.length }
        name='Students'
      />
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