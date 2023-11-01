import { Box } from '@mui/material';
import { CoursesList } from '../components';
import { useCourses } from '../../shared/hooks';
import { SectionTitleComponent } from '../../shared/components';

export const CoursesView = () => {

  const { courses, selectedCourse } = useCourses();
  
  return (
    <Box sx={{ p: { md: 3 }, my: 7 }}>
      <SectionTitleComponent
        length={ courses.length }
        name='Courses'
      />
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