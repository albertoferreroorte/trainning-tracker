import { Box, Typography } from '@mui/material';
import { AddCourseForm } from '../components';
import { useAppDispatch } from '../../shared/hooks';
import { startAddNewCourse } from '../../store/course';
import { Course } from '../entities';
import { startAddCourseTrack } from '../../store/track';

export const AddCourseView = () => {

  const dispatch = useAppDispatch();

  const handleAddCourse = (name: string, objectives: string) => {
    dispatch( startAddNewCourse(new Course(name, objectives)) );
    dispatch( startAddCourseTrack(name) );
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