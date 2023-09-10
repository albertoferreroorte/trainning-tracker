import { Card, CardContent, CardHeader, Button } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import { EditStudentForm } from './edit-student-form';
import { Student } from '../entities';

interface StudentViewProps {
  fullName: string;
  jobPosition: string;
  onDeleteStudent: () => void;
  onSaveStudent: (student: Partial<Student>) => void;
}

export const StudentView: React.FC<StudentViewProps> = ({ fullName, jobPosition, onDeleteStudent, onSaveStudent }) => {
  const handleDeleteClick = () => {
    onDeleteStudent();
  };

  const handleSaveClick = (student: Partial<Student>) => {
    onSaveStudent(student);
  };
  return (
    <Card sx={{ padding: 7, width: '100%' }}>
      <CardHeader
        action={
          <Button
            aria-label="delete"
            color="warning"
            onClick={ handleDeleteClick }
            variant="outlined"
            startIcon={<PersonOutline fontSize='large' sx={{ transform: 'rotate(180deg)' }} />}
          >
            Delete student
          </Button>
        }
        title={ fullName }
        subheader={ jobPosition }
      />
      <CardContent>
        <EditStudentForm
          onEditStudent={ handleSaveClick }
        />
      </CardContent>
    </Card>
  );
};