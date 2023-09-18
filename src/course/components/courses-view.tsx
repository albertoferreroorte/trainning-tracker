import { Card, CardContent, CardHeader, Button, Typography } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import { Course, Lesson } from '../../course';
import { EditCourseForm } from './';
import { format, parseISO } from 'date-fns';

interface CourseViewProps {
  duration: string;
  name: string;
  objectives: string;
  sinceDate: string;
  onAddLesson: (lesson: Partial<Lesson>) => void;
  onDeleteCourse: () => void;
  onDeleteLesson: (id: number) => void;
  onSaveCourse: (course: Partial<Course>) => void;
}

export const CourseView: React.FC<CourseViewProps> = ({ duration, name, objectives, sinceDate, onAddLesson, onDeleteCourse, onDeleteLesson, onSaveCourse }) => {
  
  const handleAddLesson = (lesson: Partial<Lesson>) => {
    onAddLesson(lesson);
  }
  
  const handleDeleteClick = () => {
    onDeleteCourse();
  };

  const handleDeleteLesson = (id: number) => {
    onDeleteLesson(id);
  }

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
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" display="block">Created { format(parseISO(sinceDate), 'LLLL yyyy') } </Typography>
        <Typography variant="body2" display="block" gutterBottom>Duration { duration } hours</Typography>
        <EditCourseForm
          onAddLesson={ handleAddLesson }
          onDeleteLesson={ handleDeleteLesson }
          onEditCourse={ handleSaveClick }
        />
      </CardContent>
    </Card>
  );
};