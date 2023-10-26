import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { Student } from '../entities/student';
import { StudentCoursesProgressBar } from './student-courses-progress-bar';

export const StudentsList: React.FC<{
  onSelectStudent: (student: Student) => void,
  selectedStudent: Student | null,
  students: Student[],
}> = ({ onSelectStudent, selectedStudent, students }) => {

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('fullName');

  const handleClick = (_e: React.MouseEvent<unknown>, id: string) => {
    const student: Student | undefined = students.find(s => s.id.toLocaleString() === id);
    if (!student) return;
    onSelectStudent(student);
  };
  
  const isSelected = (id: number) => selectedStudent?.id === id;

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedStudents = students.slice().sort((a, b) => {
    const isAsc = order === 'asc';
    if (orderBy === 'fullName') {
      return isAsc ? a.fullName.localeCompare(b.fullName) : b.fullName.localeCompare(a.fullName);
    } else if (orderBy === 'sinceDate') {
      const aSinceDate = parseFloat(a.sinceDate.toLocaleString());
      const bSinceDate = parseFloat(b.sinceDate.toLocaleString());
      if (!isNaN(aSinceDate) && !isNaN(bSinceDate)) {
        return isAsc ? aSinceDate - bSinceDate : bSinceDate - aSinceDate;
      }
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
                sortedStudents?.length > 1
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
                sortedStudents?.length > 1
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
            sortedStudents?.map((student) => {
              const isItemSelected = isSelected(student.id);
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
                    <Typography>{ format(new Date(student.sinceDate), 'LLL yyyy') }</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography>{ student.jobPosition }</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <StudentCoursesProgressBar student={student} />
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