import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useAppDispatch, useCourses, useLessons } from '../../shared/hooks';
import { startAddLessonToCourse, startDeleteCourse, startUpdateCourse } from '../../store/course';
import { startAddNewLesson, startDeleteLesson } from '../../store/lesson';
import { Course, Lesson } from '../entities';
import { EditCourseForm } from '../components';
import { PersonOutline } from '@mui/icons-material';
import { format, parseISO } from 'date-fns';

export const EditCourseView = () => {

  const dispatch = useAppDispatch();

  const { courses, courseLessonIds, selectedCourse } = useCourses();

  const { lessons } = useLessons( selectedCourse?.id ?? 0 );

  const handleSaveClick = (course: Partial<Course>) => {
    const updatedCourse = courses.find(course => course.id === selectedCourse?.id);
    if (updatedCourse) {
      dispatch( startUpdateCourse({ ...course, ...updatedCourse }) );
    }
  };

  const handleAddLesson = (lesson: Lesson) => {
    dispatch( startAddNewLesson(lesson) );
    dispatch( startAddLessonToCourse(selectedCourse?.id ?? 0, lesson, courseLessonIds) );
  };

  const handleDeleteClick = () => {
    if (selectedCourse?.id) {
      dispatch( startDeleteCourse(selectedCourse.id) );
    }
  };

  const handleDeleteLesson = (id: number) => {
    dispatch( startDeleteLesson(id) );
  };
  return (
    <Box sx={{ display: 'flex', flexGrow: 1, p: { lg: '100px' }, marginTop: 7, maxWidth: {  lg: 800 }, width: 'calc( 100% - 200px)' }}>
      {
        selectedCourse?.id
        && <Card sx={{ padding: 7, width: '100%' }}>
          <CardHeader
            action={
              <Button
                aria-label="delete"
                color="warning"
                onClick={ handleDeleteClick }
                variant="outlined"
                startIcon={<PersonOutline fontSize='large' sx={{ transform: 'rotate(180deg)' }} />}
              >
                Delete course
              </Button>
            }
            title={ <Typography variant="h2" component='h4' sx={{ mb: 2 }}>{ selectedCourse.name }</Typography> }
            subheader={ selectedCourse.objectives }
          />
          <CardContent sx={{ pt: 0 }}>
            <Typography variant="body2" display="block">
              Created { format(parseISO(selectedCourse.sinceDate), 'LLLL yyyy') } 
            </Typography>
            <EditCourseForm
              courses={ courses }
              lessons={ lessons }
              onAddLesson={ handleAddLesson }
              onDeleteLesson={ handleDeleteLesson }
              onEditCourse={ handleSaveClick }
              selectedCourse={ selectedCourse }
            />
          </CardContent>
        </Card>
      }
    </Box>
  );
}