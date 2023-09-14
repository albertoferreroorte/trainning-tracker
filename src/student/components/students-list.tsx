import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { useState } from 'react';
import { calculateCourseProgress } from '../../shared/helpers';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { selectStudentByEntity } from '../../store';
import { startSelectCourse, startSetCompletedLessons } from '../../store/course';
import { Student } from '../entities/student';
import { ProgressBar } from './progress-bar';

export const StudentsList: React.FC<{ students: Student[] }> = () => {
  const { selected, students } = useAppSelector(state => state.student);
  const { selectedCourse } = useAppSelector(state => state.course);
  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('fullName');

  const handleClick = (_e: React.MouseEvent<unknown>, id: string) => {
    const student: Student | undefined = students.find(s => s.id === id);
    if (!student) return;
    dispatch( selectStudentByEntity(student) );
    dispatch( startSelectCourse(null) );
    const studentCompetedLessons = students.find(s => s.id === selected?.id)?.courses?.find(c => c.id === selectedCourse?.id)?.completedLessons;
    dispatch( startSetCompletedLessons(studentCompetedLessons || []) );
  };
  const isSelected = (name: string) => selected?.id?.indexOf(name) !== -1;

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
            <TableCell>Job position</TableCell>
            <TableCell>Courses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sortedStudents.map((student) => {
              const isItemSelected = isSelected(student.id);
              return (
                <TableRow
                  key={`${student.id}${student.fullName}`}
                  onClick={(event) => handleClick(event, student.id)}
                  selected={ isItemSelected }
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', verticalAlign: 'top' }}
                >
                  <TableCell component="th" scope="row">
                    <Typography>{ student.fullName }</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography>{ student.jobPosition }</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {
                      student.courses?.map(({ id, name, lessons, completedLessons }) =>
                        <ProgressBar
                          key={ id }
                          name={ name }
                          progress={ calculateCourseProgress(lessons, completedLessons) }
                        />
                      )
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