import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { addNewEmptyCourseWithNameObjectives } from '../../store/course';
import { Course } from '../entities';
import { AddCourseForm, CoursesList } from './';

export const CoursesPage: React.FC = () => {

  const dispatch = useAppDispatch();

  const { courses } = useAppSelector(state => state.course);

  const onAddCourseHandler = (name: string, objectives: string) => {
    const courseInstance = new Course(name, objectives);
    const courseObject = courseInstance.toObject();
    dispatch( addNewEmptyCourseWithNameObjectives(courseObject) );
  };

  return (
    <ColumnLayout>
      <Box sx={{ p: { md: 3 }, mt: 1 }}>
        <Typography variant="h2" component='h4'>Create course</Typography>
        <AddCourseForm
          onAddCourse={ onAddCourseHandler }
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
              !courses.length ? (
                <Typography fontSize={ 30 } sx={{ mr: 3, opacity: 0.75 }}>No</Typography>
              ) : ''
            }
            Courses
          </Typography>
          {
            courses.length ? (
              <CoursesList courses={ courses } />
            ) : ''
          }
        </Box>
      </ColumnLayout>
    </ColumnLayout>
  );
}