import { ColumnLayout } from '../../shared/layout/column-layout';
import { AddStudentView, EditStudentView, StudentsView } from '../views';

export const StudentsPage = () => {

  return (
    <ColumnLayout layout="secondary">
      <AddStudentView />
      <ColumnLayout>
        <StudentsView />
        <ColumnLayout>
          <EditStudentView />
        </ColumnLayout>
      </ColumnLayout>
    </ColumnLayout>
  );
}