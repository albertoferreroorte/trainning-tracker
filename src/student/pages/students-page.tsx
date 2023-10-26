import { useSelectedStudent, useStudents } from '../../shared/hooks';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { AddStudentView, EditStudentView, StudentsView } from '../views';

export const StudentsPage = () => {

  const { selectedStudentId } = useStudents();
  const { selectedStudent } = useSelectedStudent(selectedStudentId ?? 0);

  return (
    <ColumnLayout layout="secondary">
      <AddStudentView />
      <ColumnLayout>
        {
          /* <Provider value={{
            courses,
            lessons,
            selectedLessonIds: completedLessons.map(lesson => lesson.id) || [],
            selectedStudent,
            selectedStudentCourseId: selectedStudentCourseId || 0,
            students,
          }}> */
        }
        <StudentsView />
        {
          selectedStudent && (
            <ColumnLayout>
              <EditStudentView />
            </ColumnLayout>
          )
        }
      </ColumnLayout>
    </ColumnLayout>
  );
}