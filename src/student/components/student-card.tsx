import { Student } from "../entities/student";

export const StudentCard: React.FC<{ student: Student }> = (props) => {
  return (
    <div className="card">
      <h2>{ props.student.fullName }</h2>
      <h3>{ props.student.jobPosition }</h3>
    </div>
  );
}