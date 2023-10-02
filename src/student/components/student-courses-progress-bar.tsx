import { HourglassEmpty } from '@mui/icons-material';
import { useSelectedStudent } from '../../shared/hooks';
import { Student } from '../entities';
import { ProgressBar } from './progress-bar';

export const StudentCoursesProgressBar: React.FC<{ student: Student}> = ({ student }) => {
  const { coursesForStudent } = useSelectedStudent(student.id);
  if (!coursesForStudent || coursesForStudent.length === 0) {
    return <HourglassEmpty color='disabled' />;
  }
  return (
    <>
      {coursesForStudent.map(course => (
        <ProgressBar
          key={course.id}
          name={course.name}
          progress={course.progress}
        />
      ))}
    </>
  );
}