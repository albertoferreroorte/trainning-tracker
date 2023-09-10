import { Box, Typography } from '@mui/material';
import { Course, Lesson } from '../../course';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { addNewEmptyStudentWithNamePosition, selectStudent, startDeleteStudentById, startSetStudents, startUpdateStudent } from '../../store';
import { startSelectCourse } from '../../store/course';
import { selectCourse, selectLesson } from '../../store/course/course-slice';
import { Student } from '../entities/student';
import { AddStudentForm } from './add-student-form';
import { StudentView } from './student-view';
import { StudentsList } from './students-list';

export const StudentsPage: React.FC = () => {

  const { selected, students } = useAppSelector(state => state.student);

  const dispatch = useAppDispatch();

  const onAddStudentHandler = (courseName: Course, name: string, position: string) => {
    const studentInstance = new Student([courseName], name, position);
    const studentObject = studentInstance.toObject();
    dispatch(addNewEmptyStudentWithNamePosition(studentObject));
  };

  const onAddStudentCourse = (course: Course) => {
    dispatch(startSelectCourse(course));
  };

  const handleDeleteStudent = () => {
    dispatch( selectStudent({ selected }) );
    if (selected) {
      dispatch(startDeleteStudentById(selected.id));
    }
  };

  const handleSaveStudent = (student: Partial<Student>) => {
    const studentEntity = {
      ...student,
      id: selected?.id,
    };
    if (selected) {
      dispatch( selectStudent(studentEntity) );
      dispatch( startUpdateStudent(studentEntity) );
      dispatch( startSetStudents() );
    }
  };

  const handleSelectCourse = (course: Course) => {
    if (course) {
      dispatch( selectCourse(course) );
    }
  }

  const handleSelectLesson = (lesson: Lesson) => {
    if (lesson) {
      dispatch( selectLesson(lesson) );
    }
  }

  return (
    <ColumnLayout>
      <Box sx={{ p: { md: 3 }, mt: 1 }}>
        <Typography variant="h2" component='h4'>Create student</Typography>
        <AddStudentForm
          onAddStudent={ onAddStudentHandler }
          onAddCourse= { onAddStudentCourse }
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
              !students.length ? (
                <Box sx={{ mr: 3, opacity: 0.75 }}>No</Box>
              ) : ''
            }
            Students
          </Typography>
          {
            students.length ? (
              <StudentsList students={ students } />
            ) : ''
          }
        </Box>
        {
          selected?.id ? (
            <ColumnLayout>
              <Box sx={{ flexGrow: 1, p: { sm: '100px'}, maxWidth: 800, width: 'calc( 100% - 200px)' }}>
                <StudentView
                  { ...selected }
                  onDeleteStudent={ handleDeleteStudent }
                  onSaveStudent={ handleSaveStudent }
                  onSelectCourse={ handleSelectCourse }
                  onSelectLesson={ handleSelectLesson }
                />
              </Box>
            </ColumnLayout>
          ) : ''
        }
      </ColumnLayout>
    </ColumnLayout>
  );
}