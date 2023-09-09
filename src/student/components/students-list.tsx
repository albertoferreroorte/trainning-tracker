import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { useState } from 'react';
import { StudentContextType, useStudentContext } from '../context';
import { Student } from '../entities/student';

export const StudentsList: React.FC<{ students: Student[] }> = ({ students }) => {
  const { selectedStudent, selectStudent }: StudentContextType = useStudentContext();

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('fullName');

  const handleClick = (_e: React.MouseEvent<unknown>, id: string) => {
    const student = students.find(s => s.id === id);
    if (student) selectStudent(student);
  };
  const isSelected = (name: string) => selectedStudent.id?.indexOf(name) !== -1;

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
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sortedStudents.map((student) => {
              const isItemSelected = isSelected(student.id);
              return (
                <TableRow
                  key={student.id}
                  onClick={(event) => handleClick(event, student.id)}
                  selected={ isItemSelected }
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row">
                    {student.fullName}
                  </TableCell>
                  <TableCell>{student.jobPosition}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}