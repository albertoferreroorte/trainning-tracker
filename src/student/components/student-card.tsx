import { Student } from '../entities/student';

export const StudentCard: React.FC<{ student: Student }> = ({ student }) => {
  return (
    <div className="card">
      <h2>{ student.fullName }</h2>
      <h3>{ student.jobPosition }</h3>
    </div>
  );
}