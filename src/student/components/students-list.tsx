import { Student } from '../entities/student';
import { StudentCard } from './student-card';

export const StudentsList: React.FC<{ students: Student[] }> = (props) => {
  return (
    <ul>
      {
        props.students.map(student => (
          <StudentCard  key={ student.id } student={ student } />
        ))
      }
    </ul>
  );
}