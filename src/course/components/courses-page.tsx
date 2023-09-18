import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { addNewEmptyCourseWithNameObjectives, startAddNewLesson, startDeleteCourseById, startDeleteLesson, startSelectCourse, startSetCourseLessons, startSetCourses } from '../../store/course';
import { Course, Lesson } from '../entities';
import { AddCourseForm, CoursesList, CourseView } from './';

export const CoursesPage: React.FC = () => {

  const dispatch = useAppDispatch();

  const { courseLessons, courses, selectedCourse } = useAppSelector(state => state.course);

  const onAddCourseHandler = (name: string, objectives: string) => {
    dispatch( addNewEmptyCourseWithNameObjectives(new Course(name, objectives)) );
    dispatch( startSelectCourse(null) );
    dispatch( startSetCourseLessons([]) );
  };

  const courseDuration = courseLessons.reduce((acc, curr) => { return acc + Number(curr.duration) }, 0);

  const handleSaveCourse = (course: Partial<Course>) => {
    if (!selectedCourse) return;
    const updatedCourses: Course[] = courses.map(c => {
      if (c.id === selectedCourse.id) {
        return {
          ...c,
          ...course,
          courseLessons,
          duration: courseDuration,
        };
      }
      return c;
    });
    const updatedCourse = updatedCourses.find(c => c.id === selectedCourse.id);

    if (updatedCourse) {
      dispatch( startSelectCourse(updatedCourse) );
    }
    dispatch( startSetCourses( updatedCourses ) );
  };

  const handleAddLesson = (lesson: Partial<Lesson>) => {
    dispatch( startAddNewLesson(lesson) );
  }

  const handleDeleteCourse = () => {
    if (selectedCourse) {
      dispatch( startDeleteCourseById(selectedCourse.id) );
    }
  }

  const handleDeleteLesson = (id: number) => {
    const updatedCourses: Course[] = courses.map(c => {
      if (c.id === selectedCourse?.id) {
        return {
          ...c,
          courseLessons,
        };
      }
      return c;
    });
    dispatch( startDeleteLesson(id) );
    dispatch( startSetCourses( updatedCourses ) );
  }

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
        {
          selectedCourse?.id ? (
            <ColumnLayout>
              <Box sx={{ flexGrow: 1, p: { sm: '100px'}, maxWidth: 800, width: 'calc( 100% - 200px)' }}>
                <CourseView
                  { ...selectedCourse }
                  duration={ courseDuration?.toLocaleString() || '0' }
                  sinceDate={ selectedCourse.sinceDate }
                  onAddLesson={ handleAddLesson }
                  onDeleteCourse={ handleDeleteCourse }
                  onDeleteLesson={ handleDeleteLesson }
                  onSaveCourse={ handleSaveCourse }
                />
              </Box>
            </ColumnLayout>
          ) : ''
        }
      </ColumnLayout>
    </ColumnLayout>
  );
}