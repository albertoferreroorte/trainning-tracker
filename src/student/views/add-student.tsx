import { Box, Typography } from '@mui/material';
import { AddStudentForm } from '../components';
import { useAppDispatch } from '../../shared/hooks';
import { Student } from '../entities';
import { startAddStudent } from '../../store/student';

export const AddStudentView = () => {

  const dispatch = useAppDispatch();

  const handleAddStudent = (name: string, position: string) => {
    const newStudent = new Student(name, position, []);
    dispatch( startAddStudent(newStudent) );
  };

  return (
    <Box sx={{ p: { md: 3 }, my: 7 }}>
      <Typography variant="h2" component='h4'>Create student</Typography>
      <AddStudentForm onAddStudent={ handleAddStudent } />
    </Box>
  );
}