import { PersonOutline } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { format } from 'date-fns';
import { EditStudentForm } from '../components';
import { useAppDispatch, useCourses, useSelectedStudent, useStudents } from '../../shared/hooks';
import { startDeleteStudent, startSelectStudentCourse, startSelectStudentLessons, startSetStudentCourseLessons, startUpdateStudent } from '../../store/student';
import { Student } from '../entities';

export const EditStudentView = () => {

  const dispatch = useAppDispatch();

  const { courses } = useCourses();
  const { selectedStudentId, selectedStudentCourseId, studentCourseLessons } = useStudents();
  const { studentCourseCompletedLessons, selectedStudent } = useSelectedStudent(selectedStudentId ?? 0);
 
  const handleDeleteStudent = () => {
    if (!selectedStudent?.id) return;
    dispatch( startDeleteStudent(selectedStudent.id) );
  };

  const handleSaveStudent = (student: Partial<Student>) => {
    if (selectedStudentCourseId && selectedStudent?.id && student.id) {
      dispatch( startUpdateStudent(selectedStudent.id, selectedStudentCourseId) );
    }
  };
  
  const handleSelectCourse = (course: number) => {
    dispatch( startSelectStudentCourse(course) );
  }

  const handleSelectLessonIds = (lessonIds: number[]) => {
    if (!selectedStudentCourseId || !selectedStudent?.id) return;
    dispatch( startSelectStudentLessons(selectedStudentCourseId, lessonIds, selectedStudent.id) );
  }

  const handleSetLessons = (lessons: number[]) => {
    dispatch(startSetStudentCourseLessons(lessons));
  }

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, p: { lg: '100px' }, marginTop: 7, maxWidth: {  lg: 800 }, width: 'calc( 100% - 200px)' }}>
      {
        selectedStudent && (
          <Card sx={{ padding: 7, width: '100%' }}>
            <CardHeader
              action={
                <Button
                  aria-label="delete"
                  color="warning"
                  onClick={ handleDeleteStudent }
                  variant="outlined"
                  startIcon={<PersonOutline fontSize='large' sx={{ transform: 'rotate(180deg)' }} />}
                >
                  Delete student
                </Button>
              }
              sx={{ paddingBottom: 0 }}
              title={
                <Typography variant="h2" component='h4'>
                  { selectedStudent?.fullName }
                </Typography>
              }
              subheader={ selectedStudent?.jobPosition }
            />
            <CardContent sx={{ marginTop: 1, paddingTop: 0 }}>
              <Typography variant="body2" display="block" gutterBottom>
                Studying since { 
                  selectedStudent
                    ? format(new Date(selectedStudent.sinceDate), 'LLL yyyy')
                    : 'unknown'
                }
              </Typography>
              <EditStudentForm
                courses={ courses }
                lessons={ studentCourseLessons }
                onEditStudent={ handleSaveStudent }
                onSelectCourse={ handleSelectCourse }
                onSelectLessonIds={ handleSelectLessonIds }
                onSetLessonIds={ handleSetLessons }
                selectedCourseId={ selectedStudentCourseId }
                selectedLessonIds={ studentCourseCompletedLessons.map(lesson => lesson?.id || 0) || [] }
                selectedStudent={ selectedStudent }
              />
            </CardContent>
          </Card>
        )
      }
    </Box>
  );
}