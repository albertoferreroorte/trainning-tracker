import { Card, CardContent, CardHeader, Button, Typography } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import { EditStudentForm } from './';
import { Student } from '../entities';
import { Course, Lesson } from '../../course';
import { format } from 'date-fns';

interface StudentViewProps {
  courses: Course[];
  fullName: string;
  jobPosition: string;
  lessons: Lesson[];
  sinceDate: number;
  onDeleteStudent: () => void;
  onSaveStudent: (student: Partial<Student>) => void;
  onSelectCourse: (course: number) => void;
  onSelectLessonIds: (lessonIds: number[]) => void;
  onSetLessonIds: (lessonIds: number[]) => void;
  selectedCourseId: number | null;
  selectedLessonIds: number[];
  selectedStudent: Student | null;
}

export const StudentView: React.FC<StudentViewProps> = ({ courses, fullName, jobPosition, lessons, sinceDate, onDeleteStudent, onSaveStudent, onSelectCourse, onSelectLessonIds, onSetLessonIds, selectedCourseId, selectedLessonIds, selectedStudent }) => {
  const handleDeleteClick = () => {
    onDeleteStudent();
  };

  const handleSaveClick = (student: Partial<Student>) => {
    onSaveStudent(student);
  };

  const handleSelectCourse = (course: number) => {
    onSelectCourse(course);
  };

  const handleSelectLessonIds = (lessonIds: number[]) => {
    onSelectLessonIds(lessonIds);
  };

  const handleSetLessons = (lessonIds: number[]) => {
    onSetLessonIds(lessonIds);
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
        sx={{ paddingBottom: 0 }}
        title={ <Typography variant="h2" component='h4'>{ fullName }</Typography> }
        subheader={ jobPosition }
      />
      <CardContent sx={{ marginTop: 1, paddingTop: 0 }}>
        <Typography variant="body2" display="block" gutterBottom>Studying since { format(new Date(sinceDate), 'LLL yyyy') }</Typography>
        <EditStudentForm
          courses={ courses }
          lessons={ lessons }
          onEditStudent={ handleSaveClick }
          onSelectCourse={ handleSelectCourse }
          onSelectLessonIds={ handleSelectLessonIds }
          onSetLessonIds={ handleSetLessons }
          selectedCourseId={ selectedCourseId }
          selectedLessonIds={ selectedLessonIds }
          selectedStudent={ selectedStudent }
        />
      </CardContent>
    </Card>
  );
};