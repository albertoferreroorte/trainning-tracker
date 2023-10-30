import { ColumnLayout } from '../../shared/layout/column-layout';
import { AddStudentView, EditStudentView, StudentsView } from '../views';

export const StudentsPage = () => {

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
        <ColumnLayout>
          <EditStudentView />
        </ColumnLayout>
      </ColumnLayout>
    </ColumnLayout>
  );
}