import { Box, Typography } from '@mui/material';
import { useAppDispatch, useCompletedLessons, useCourses, useLessons, useSelectedStudent, useStudents } from '../../shared/hooks';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { startAddStudent, startDeleteStudent, startSelectStudent, startSelectStudentCourse, startSelectStudentLessons, startSetStudentCourseLessons, startUpdateStudent } from '../../store/student';
import { Student } from '../entities/student';
import { AddStudentForm } from '../components/add-student-form';
import { StudentView } from '../components/student-view';
import { StudentsList } from '../components/students-list';

export const StudentsPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const { courses } = useCourses();
  const { selectedStudentId, selectedStudentCourseId, students } = useStudents();
  const { selectedStudent } = useSelectedStudent(selectedStudentId ?? 0);
  const { lessons } = useLessons(selectedStudentCourseId ?? 0);
  const { completedLessons } = useCompletedLessons(selectedStudent?.id ?? 0, selectedStudentCourseId ?? 0);

  const onAddStudentHandler = (name: string, position: string) => {
    const newStudent = new Student(name, position, []);
    dispatch( startAddStudent(newStudent) );
  };

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

  const handleSelectStudent = (student: Student) => {
    dispatch( startSelectStudent(student.id) );
  }

  const handleSetLessons = (lessons: number[]) => {
    dispatch(startSetStudentCourseLessons(lessons));
  }

  return (
    <ColumnLayout layout="secondary">
      <Box sx={{ p: { md: 3 }, mt: 1 }}>
        <Typography variant="h2" component='h4'>Create student</Typography>
        <AddStudentForm
          onAddStudent={ onAddStudentHandler }
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
              !students?.length ? (
                <Typography fontSize={ 30 } sx={{ mr: 3, opacity: 0.75 }}>No</Typography>
              ) : ''
            }
            Students
          </Typography>
          {
            students.length ? (
              <StudentsList
                onSelectStudent={ handleSelectStudent }
                selectedStudent={ selectedStudent ?? null }
                students={ students }
              />
            ) : ''
          }
        </Box>
        {
          selectedStudent ? (
            <ColumnLayout>
              <Box sx={{ flexGrow: 1, p: { sm: '100px'}, maxWidth: 800, width: 'calc( 100% - 200px)' }}>
                <StudentView
                  { ...selectedStudent }
                  courses={ courses }
                  fullName={ selectedStudent?.fullName || '' }
                  jobPosition={ selectedStudent?.jobPosition || '' }
                  lessons={ lessons }
                  onDeleteStudent={ handleDeleteStudent }
                  onSaveStudent={ handleSaveStudent }
                  onSelectCourse={ handleSelectCourse }
                  onSelectLessonIds={ handleSelectLessonIds }
                  onSetLessonIds={ handleSetLessons }
                  selectedCourseId={ selectedStudentCourseId ?? null }
                  selectedLessonIds={ completedLessons.map(lesson => lesson.id) || [] }
                  selectedStudent={ selectedStudent }
                  sinceDate={ selectedStudent?.sinceDate || 0 }
                />
              </Box>
            </ColumnLayout>
          ) : ''
        }
      </ColumnLayout>
    </ColumnLayout>
  );
}