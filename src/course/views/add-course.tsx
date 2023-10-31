import { Box, Typography } from '@mui/material';
import { AddCourseForm } from '../components';
import { useAppDispatch } from '../../shared/hooks';
import { startAddNewCourse } from '../../store/course';
import { Course } from '../entities';

export const AddCourseView = () => {

  const dispatch = useAppDispatch();

  const handleAddCourse = (name: string, objectives: string) => {
    dispatch( startAddNewCourse(new Course(name, objectives)) );
  };

  return (
    <Box sx={{ p: { md: 3 }, my: 7 }}>
      <Typography variant="h2" component='h4'>Create course</Typography>
      <AddCourseForm
        onAddCourse={ handleAddCourse }
      />
    </Box>
  );
}