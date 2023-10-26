import { Box, Typography } from '@mui/material';
import { useAppDispatch, useCourses, useLessons } from '../../shared/hooks';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { startAddLessonToCourse, startAddNewCourse, startDeleteCourse, startUpdateCourse } from '../../store/course';
import { startAddNewLesson, startDeleteLesson } from '../../store/lesson';
import { Course, Lesson } from '../entities';
import { AddCourseForm, CoursesList, CourseView } from '../components';

export const CoursesPage: React.FC = () => {

  const dispatch = useAppDispatch();

  const { courses, courseLessonIds, selectedCourse } = useCourses();

  const { lessons } = useLessons( selectedCourse?.id ?? 0 );

  const onAddCourseHandler = (name: string, objectives: string) => {
    dispatch( startAddNewCourse(new Course(name, objectives)) );
  };

  const handleSaveCourse = (course: Partial<Course>) => {
    const updatedCourse = courses.find(course => course.id === selectedCourse?.id);
    if (updatedCourse) {
      dispatch( startUpdateCourse({ ...course, ...updatedCourse }) );
    }
  };

  const handleAddLesson = (lesson: Lesson) => {
    dispatch( startAddNewLesson(lesson) );
    dispatch(startAddLessonToCourse(selectedCourse?.id ?? 0, lesson, courseLessonIds));
  };

  const handleDeleteCourse = () => {
    if (selectedCourse?.id) {
      dispatch( startDeleteCourse(selectedCourse.id) );
    }
  };

  const handleDeleteLesson = (id: number) => {
    dispatch( startDeleteLesson(id) );
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
              <CoursesList
                courses={ courses }
                selectedCourse={ selectedCourse ?? null }
              />
            ) : ''
          }
        </Box>
        {
          selectedCourse?.id ? (
            <ColumnLayout>
              <Box sx={{ flexGrow: 1, p: { sm: '100px'}, maxWidth: 800, width: 'calc( 100% - 200px)' }}>
                <CourseView
                  courses={ courses }
                  name={ selectedCourse?.name || '' }
                  lessons={ lessons }
                  objectives={ selectedCourse?.objectives || '' }
                  onAddLesson={ handleAddLesson }
                  onDeleteCourse={ handleDeleteCourse }
                  onDeleteLesson={ handleDeleteLesson }
                  onSaveCourse={ handleSaveCourse }
                  selectedCourse={ selectedCourse }
                  sinceDate={ selectedCourse?.sinceDate || '' }
                />
              </Box>
            </ColumnLayout>
          ) : ''
        }
      </ColumnLayout>
    </ColumnLayout>
  );
}