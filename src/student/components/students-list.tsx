import { HourglassEmpty } from '@mui/icons-material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { calculateCourseProgress } from '../../shared/helpers';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { selectStudentByEntity, startSelectStudentCourse } from '../../store';
import { startSetCompletedLessons } from '../../store/course';
import { Student } from '../entities/student';
import { ProgressBar } from './progress-bar';

export const StudentsList: React.FC<{ students: Student[] }> = () => {
  const { selected, selectedStudentCourse, students } = useAppSelector(state => state.student);
  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('fullName');

  const handleClick = (_e: React.MouseEvent<unknown>, id: string) => {
    const student: Student | undefined = students.find(s => s.id.toLocaleString() === id);
    if (!student) return;
    dispatch( selectStudentByEntity(student) );
    dispatch( startSelectStudentCourse(null) );
    const studentCompetedLessons = students.find(s => s.id === selected?.id)?.courses?.find(c => c.id === selectedStudentCourse?.id)?.completedLessons;
    dispatch( startSetCompletedLessons(studentCompetedLessons || []) );
  };
  const isSelected = (name: string) => selected?.id?.toLocaleString().indexOf(name) !== -1;

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedStudents = students.slice().sort((a, b) => {
    const isAsc = order === 'asc';
    if (orderBy === 'fullName') {
      return isAsc ? a.fullName.localeCompare(b.fullName) : b.fullName.localeCompare(a.fullName);
    }
    return 0;
  });

  const sortedSinceDates = students.slice().sort((a, b) => {
    const isAsc = order === 'asc';
    if (orderBy === 'sinceDate') {
      return isAsc ? a.sinceDate.localeCompare(b.sinceDate) : b.sinceDate.localeCompare(a.sinceDate);
    }
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="students list table">
        <TableHead>
          <TableRow>
            <TableCell>
              {
                sortedStudents.length > 1
                  ? (<TableSortLabel
                    active={orderBy === 'fullName'}
                    direction={order}
                    onClick={() => handleRequestSort('fullName')}
                  >
                    Student
                  </TableSortLabel>)
                  : ( 'Student' )
              }
            </TableCell>
            <TableCell>
              {
                sortedSinceDates.length > 1
                  ? (<TableSortLabel
                      active={orderBy === 'sinceDate'}
                      direction={order}
                      onClick={() => handleRequestSort('sinceDate')}
                    >
                      Studying since
                    </TableSortLabel>)
                  : ( 'Studying since' )
              }
            </TableCell>
            <TableCell>Job position</TableCell>
            <TableCell>Courses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sortedStudents.map((student) => {
              const isItemSelected = isSelected(student.id.toLocaleString());
              return (
                <TableRow
                  key={`${student.id}${student.fullName}`}
                  onClick={(event) => handleClick(event, student.id.toLocaleString())}
                  selected={ isItemSelected }
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', verticalAlign: 'top' }}
                >
                  <TableCell component="th" scope="row">
                    <Typography>{ student.fullName }</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography>{ format(parseISO(student.sinceDate), 'LLL yyyy') }</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography>{ student.jobPosition }</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {
                      student.courses
                        ? student.courses.map(({ id, name, courseLessons, completedLessons }) =>
                          <ProgressBar
                            key={ id }
                            name={ name }
                            progress={ calculateCourseProgress(courseLessons, completedLessons) }
                          />
                        )
                        : <HourglassEmpty color='disabled' />
                    }
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