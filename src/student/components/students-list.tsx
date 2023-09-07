import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { StudentContextType, useStudentContext } from '../context';
import { Student } from '../entities/student';

const columns = [
  'Student', 'Job position',
];

export const StudentsList: React.FC<{ students: Student[] }> = ({ students }) => {
  const { selectedStudent, selectStudent }: StudentContextType = useStudentContext();
  const handleClick = (_e: React.MouseEvent<unknown>, student: string) => {
    selectStudent(student);
  };
  const isSelected = (name: string) => selectedStudent.indexOf(name) !== -1;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* {
              columns.map(column => (
                <TableCell
                  key={column}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    column
                  </TableSortLabel>
                </TableCell>
              ))
            } */}
            <TableCell>Student</TableCell>
            <TableCell>Job position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            students.map((student) => {
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