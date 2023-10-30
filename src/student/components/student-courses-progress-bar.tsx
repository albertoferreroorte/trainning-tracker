import { HourglassEmpty } from '@mui/icons-material';
import { ProgressBar } from './progress-bar';
import { Student } from '../entities';
import { useSelectedStudent } from '../../shared/hooks';

interface Props {
  student: Student;
}

export const StudentCoursesProgressBar = ({ student }: Props) => {

  const { coursesForStudent } = useSelectedStudent(student.id);

  if (!coursesForStudent || coursesForStudent.length === 0) {
    return <HourglassEmpty color='disabled' />;
  }
  
  return (
    <>
      {
        coursesForStudent.map(course => (
          course && <ProgressBar
            key={ course.id }
            name={ course.name }
            progress={ course.progress }
          />
        ))
      }
    </>
  );
}