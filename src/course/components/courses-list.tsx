import { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { Course } from '../entities';
import { startSelectCourse, startSetCourseLessons } from '../../store/course';

export const CoursesList: React.FC<{ courses: Course[] }> = () => {
  const dispatch = useAppDispatch();

  const { courses, selectedCourse } = useAppSelector(state => state.course);
  const { students } = useAppSelector(state => state.student);

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');

  const getNumberOfStudentsCourse = ( id: number ) => students.filter(s => s.courses?.some(c => c.id === id && c.courseLessons.every(l => l.id))).length;

  const getTimesCompletedCourse = ( id: number ) => students.filter(s => s.courses?.some(c => c.id === id && c.completed)).length;

  const handleClick = (_e: React.MouseEvent<unknown>, id: string) => {
    const course: Course | undefined = courses.find(c => c.id.toLocaleString() === id);
    if (!course) return;
    dispatch( startSelectCourse(course) );
    const lessons = course.courseLessons;
    dispatch( startSetCourseLessons(lessons) );
  };
  
  const isSelected = (name: string) => selectedCourse?.id.toLocaleString().indexOf(name) !== -1;

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedCourses = courses.slice().sort((a, b) => {
    const isAsc = order === 'asc';
    if (orderBy === 'name') {
      return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="courses list table">
        <TableHead>
          <TableRow>
            <TableCell>
              {
                sortedCourses.length > 1
                  ? (<TableSortLabel
                    active={orderBy === 'name'}
                    direction={order}
                    onClick={() => handleRequestSort('name')}
                  >
                    Course
                  </TableSortLabel>)
                  : ( 'Course' )
              }
            </TableCell>
            <TableCell>Objectives</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Number of students</TableCell>
            <TableCell>Times completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sortedCourses.map((course) => {
              const isItemSelected = isSelected(course.id?.toLocaleString());
              return (
                <TableRow
                  key={`${course.id}${course.name}`}
                  onClick={(event) => handleClick(event, course.id?.toLocaleString())}
                  selected={ isItemSelected }
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', verticalAlign: 'top' }}
                >
                  <TableCell component="th" scope="row">
                    <Typography>{ course.name }</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography>{ course.objectives }</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography>{ course.duration } hours</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography>{ getNumberOfStudentsCourse(course.id) }</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography>{ getTimesCompletedCourse(course.id) }</Typography>
                  </TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}