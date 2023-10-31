import { Box, Typography } from '@mui/material';
import { CoursesList } from '../components';
import { useCourses } from '../../shared/hooks';

export const CoursesView = () => {

  const { courses, selectedCourse } = useCourses();
  
  return (
    <Box sx={{ p: { md: 3 }, mb: 3 }}>
      <Typography
        component='h3'
        variant="h2"
        sx={{ my: 3 }}
      >
        {
          !courses.length ? (
            <Typography fontSize={ 30 } sx={{ mr: 3, opacity: 0.75 }}>No</Typography>
          ) : ''
        }
        Courses
      </Typography>
      {
        courses.length ? (
          <CoursesList
            courses={ courses }
            selectedCourse={ selectedCourse ?? null }
          />
        ) : ''
      }
    </Box>
  );
}