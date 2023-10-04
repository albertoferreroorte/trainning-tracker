import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { Course } from '../entities';
import { startSelectCourse } from '../../store/course';
import { getCourseDurationFromLessons, getNumberOfStudentsCourse, getTimesCompletedCourse, RootState } from '../../store';
import { format } from 'date-fns';

interface CourseRowProps {
  course: Course;
  isSelected: (id: string) => boolean;
  onSelectionChange: (id: number) => void;
}

const CourseRow: React.FC<CourseRowProps> = ({ course, isSelected, onSelectionChange }) => {
  const attendances = useAppSelector((state: RootState) => getNumberOfStudentsCourse(state, course.id));
  const completions = useAppSelector((state: RootState) => getTimesCompletedCourse(state, course.id));
  const duration = useAppSelector((state: RootState) => getCourseDurationFromLessons(state, course.id));
  return (
    <TableRow
      key={`${course.id}${course.name}`}
      onClick={() => onSelectionChange(course.id)}
      selected={isSelected(course.id?.toLocaleString())}
      sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', verticalAlign: 'top' }}
    >
      <TableCell>{ course.name }</TableCell>
      <TableCell>{ format(new Date(course.sinceDate), 'LLL yyyy') }</TableCell>
      <TableCell>{ course.objectives }</TableCell>
      <TableCell>{ duration }</TableCell>
      <TableCell>{ attendances }</TableCell>
      <TableCell>{ completions }</TableCell>
    </TableRow>
  );
}

export const CoursesList: React.FC<{ courses: Course[], selectedCourse: Course | null }> = ({ courses, selectedCourse }) => {
  const dispatch = useAppDispatch();

  const coursesDict = useAppSelector((state: RootState) => state.course.entities);
  const coursesArray = Object.values(coursesDict || {});
  const validCourses = coursesArray.filter(Boolean);

  const handleSelectionChange = (id: number) => {
    const course: Course | undefined = courses.find(c => c.id === id);
    if (!course) return;
    dispatch( startSelectCourse(course.id) );
  };

  const isSelected = (id: string) => selectedCourse?.id.toLocaleString() === id;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="courses list table">
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Objectives</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Number of students</TableCell>
            <TableCell>Times completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            validCourses.map((course) => course
              ? (
                <CourseRow 
                  key={ course?.id } 
                  course={ course } 
                  isSelected={ isSelected }
                  onSelectionChange={ handleSelectionChange }
                />
              )
              : ('')
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}