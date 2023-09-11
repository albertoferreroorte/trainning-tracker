import { Box, Typography } from '@mui/material';
import { Course, Lesson } from '../../course';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { addNewEmptyStudentWithNamePosition, selectStudent, startDeleteStudentById, startSetCourses, startSetStudents, startUpdateStudent } from '../../store';
import { selectCourse, selectLesson } from '../../store/course/course-slice';
import { Student } from '../entities/student';
import { AddStudentForm } from './add-student-form';
import { StudentView } from './student-view';
import { StudentsList } from './students-list';

export const StudentsPage: React.FC = () => {

  const { selectedCourse } = useAppSelector(state => state.course);

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
    if (selected) {      
      const studentCourses = Array.isArray(student.courses)
        ? student.courses
        : [];
      const isCourseSelected = selectedCourse
        ? !studentCourses.some((course) => course.id === selectedCourse.id)
        : false;
      const updatedCourses = isCourseSelected && selectedCourse
        ? [...studentCourses, selectedCourse]
        : studentCourses;
      const updatedStudentEntity: Partial<Student> = {
        ...student,
        courses: updatedCourses,
        id: selected.id,
      };
      const updatedStudents = students.map((studentItem) => {
        if (studentItem.id === selected.id) {
          const studentCourses = studentItem.courses || [];
          const updatedStudentCourses = isCourseSelected && selectedCourse
            ? [...studentCourses, selectedCourse]
            : studentCourses;
          return {
            ...studentItem,
            courses: updatedStudentCourses,
            fullName: student.fullName || studentItem.fullName,
            jobPosition: student.jobPosition || studentItem.jobPosition,
          };
        }
        return studentItem;
      });
      dispatch( selectStudent(updatedStudentEntity) );
      dispatch( startUpdateStudent(updatedStudentEntity) );
      dispatch(startSetStudents(updatedStudents));
    }
  };

  const handleSelectCourse = (course: Course) => {
    dispatch( selectCourse(course) );
    dispatch( startSetCourses(course) );
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