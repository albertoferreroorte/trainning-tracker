import { Card, CardContent, CardHeader, Button, Typography } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import { Course } from '../../course';
import { EditCourseForm } from './';

interface CourseViewProps {
  name: string;
  objectives: string;
  onDeleteCourse: () => void;
  onSaveCourse: (course: Partial<Course>) => void;
}

export const CourseView: React.FC<CourseViewProps> = ({ name, objectives, onDeleteCourse, onSaveCourse }) => {
  const handleDeleteClick = () => {
    onDeleteCourse();
  };

  const handleSaveClick = (course: Partial<Course>) => {
    onSaveCourse(course);
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
            Delete course
          </Button>
        }
        title={ <Typography variant="h2" component='h4'>{ name }</Typography> }
        subheader={ objectives }
      />
      <CardContent>
        <EditCourseForm
          onEditCourse={ handleSaveClick }
        />
      </CardContent>
    </Card>
  );
};