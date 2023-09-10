import { Card, CardContent, CardHeader, Button, Typography } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import { EditStudentForm } from './edit-student-form';
import { Student } from '../entities';
import { Course, Lesson } from '../../course';

interface StudentViewProps {
  fullName: string;
  jobPosition: string;
  onDeleteStudent: () => void;
  onSaveStudent: (student: Partial<Student>) => void;
  onSelectCourse: (course: Course) => void;
  onSelectLesson: (lesson: Lesson) => void;
}

export const StudentView: React.FC<StudentViewProps> = ({ fullName, jobPosition, onDeleteStudent, onSaveStudent, onSelectCourse, onSelectLesson }) => {
  const handleDeleteClick = () => {
    onDeleteStudent();
  };

  const handleSaveClick = (student: Partial<Student>) => {
    onSaveStudent(student);
  };

  const handleSelectCourse = (course: Course) => {
    onSelectCourse(course);
  };

  const handleSelectLesson = (lesson: Lesson) => {
    onSelectLesson(lesson);
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
        title={ <Typography variant="h2" component='h4'>{ fullName }</Typography> }
        subheader={ jobPosition }
      />
      <CardContent>
        <EditStudentForm
          onEditStudent={ handleSaveClick }
          onSelectCourse={ handleSelectCourse }
          onSelectLesson={ handleSelectLesson }
        />
      </CardContent>
    </Card>
  );
};