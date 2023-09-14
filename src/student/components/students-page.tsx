import { Box, Typography } from '@mui/material';
import { Course, Lesson } from '../../course';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { addNewEmptyStudentWithNamePosition, selectStudent, startDeleteStudentById, startSetStudents } from '../../store';
import { startSelectCourse, startSetActiveCourse, startSetCompletedLessons } from '../../store/course';
import { Student } from '../entities/student';
import { AddStudentForm } from './add-student-form';
import { StudentView } from './student-view';
import { StudentsList } from './students-list';

export const StudentsPage: React.FC = () => {

  const { selectedCourse, completedLessons } = useAppSelector(state => state.course);

  const { selected, students } = useAppSelector(state => state.student);

  const dispatch = useAppDispatch();

  const onAddStudentHandler = (name: string, position: string) => {
    const studentInstance = new Student(name, position);
    const studentObject = studentInstance.toObject();
    dispatch(addNewEmptyStudentWithNamePosition(studentObject));
  };

  const handleDeleteStudent = () => {
    dispatch( selectStudent({ selected }) );
    if (selected) {
      dispatch(startDeleteStudentById(selected.id));
    }
  };

  const handleSaveStudent = (student: Partial<Student>) => {
    if (!selected) return;

    const updatedStudents = students.map(studentItem => {
      if (studentItem.id === selected.id) {
        const existingCourses = studentItem.courses || [];
        const updatedStudentCourses = [...existingCourses];

        if (selectedCourse) {
          const isCourseSelected = !existingCourses.some(course => course.id === selectedCourse.id);

          if (isCourseSelected) {
            updatedStudentCourses.push({
              ...selectedCourse,
              completedLessons,
            });
          }
        }

        return {
          ...studentItem,
          courses: updatedStudentCourses,
          fullName: student.fullName || studentItem.fullName,
          jobPosition: student.jobPosition || studentItem.jobPosition,
        };
      }

      return studentItem;
    });

    dispatch(startSetStudents(updatedStudents));

    if (selectedCourse) {
      dispatch(startSetActiveCourse(selectedCourse));
    }
  };
  

  const handleSelectCourse = (course: Course) => {
    dispatch( startSelectCourse(course) );
  }

  const handleSelectLessons = (lessons: Lesson[]) => {
    dispatch( startSetCompletedLessons(lessons) );
  }

  return (
    <ColumnLayout>
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
              !students.length ? (
                <Typography fontSize={ 30 } sx={{ mr: 3, opacity: 0.75 }}>No</Typography>
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
                  onSelectLessons={ handleSelectLessons }
                />
              </Box>
            </ColumnLayout>
          ) : ''
        }
      </ColumnLayout>
    </ColumnLayout>
  );
}