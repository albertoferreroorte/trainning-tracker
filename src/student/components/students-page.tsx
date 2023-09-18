import { Box, Typography } from '@mui/material';
import { Course, Lesson } from '../../course';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { addNewEmptyStudentWithNamePosition, selectStudent, startDeleteStudentById, startSelectStudentCourse, startSetStudents } from '../../store';
import { startSelectCourse, startSetCompletedLessons } from '../../store/course';
import { Student } from '../entities/student';
import { AddStudentForm } from './add-student-form';
import { StudentView } from './student-view';
import { StudentsList } from './students-list';

export const StudentsPage: React.FC = () => {

  const { completedLessons } = useAppSelector(state => state.course);

  const { selected, selectedStudentCourse, students } = useAppSelector(state => state.student);

  const dispatch = useAppDispatch();

  const onAddStudentHandler = (name: string, position: string) => {
    dispatch( addNewEmptyStudentWithNamePosition(new Student(name, position)) );
    dispatch( selectStudent(null) );
    dispatch( startSelectCourse(null) );
  };

  const handleDeleteStudent = () => {
    if (!selected) return;
    dispatch( selectStudent({ selected }) );
    dispatch( startDeleteStudentById(selected.id) );
  };

  const handleSaveStudent = (student: Partial<Student>) => {
    if (!selected) return;
  
    const updatedStudents: Partial<Student>[] = students.map(studentItem => {
      if (studentItem.id === selected.id) {
        const existingCourses = studentItem.courses || [];
        const updatedStudentCourses: Course[] = existingCourses.map(course => {
          if (selectedStudentCourse && course.id === selectedStudentCourse.id) {
            const studentCompletedLessons = completedLessons.map(lesson => lesson.id);
            const completedLessonIds = completedLessons.map(lesson => lesson.id);
            const newCompletedLessonIds = [...studentCompletedLessons, ...completedLessonIds];
            const uniqueCompletedLessonIds = Array.from(new Set(newCompletedLessonIds));
            const updatedCourseLessons = selectedStudentCourse.courseLessons.filter(lesson =>
              uniqueCompletedLessonIds.includes(lesson.id)
            );
            const completed = completedLessons.length === selectedStudentCourse.courseLessons.length;
            return {
              ...course,
              completed,
              completedLessons: updatedCourseLessons,
            } as Course;
          }
          return course;
        });
  
        if (selectedStudentCourse) {
          const isCourseSelected = !existingCourses.some(course => course.id === selectedStudentCourse.id);
          if (isCourseSelected) {
            return {
              ...studentItem,
              courses: [
                ...updatedStudentCourses,
                {
                  ...selectedStudentCourse,
                  completedLessons,
                } as Course
              ],
              fullName: student.fullName || studentItem.fullName,
              jobPosition: student.jobPosition || studentItem.jobPosition,
            };
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
  
    const updatedStudent = updatedStudents.find(s => s.id === selected.id);
    if (updatedStudent) dispatch( selectStudent(updatedStudent) );
    dispatch( startSetStudents(updatedStudents) );
  };
  
  
  const handleSelectCourse = (course: Course) => {
    dispatch( startSelectStudentCourse(course) );
  }

  const handleSelectLessons = (lessons: Lesson[]) => {
    dispatch( startSetCompletedLessons(lessons) );
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
                  sinceDate={ selected.sinceDate }
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