import { ColumnLayout } from '../../shared/layout/column-layout';
import { AddStudentView, EditStudentView, StudentsView } from '../views';
import { ProjectDescriptionComponent } from '../../shared/components';

export const StudentsPage = () => {

  return (
    <ColumnLayout layout="secondary">
      <AddStudentView />
      <ColumnLayout>
        <StudentsView />
        <ColumnLayout>
          <EditStudentView />
        </ColumnLayout>
        <ProjectDescriptionComponent />
      </ColumnLayout>
    </ColumnLayout>
  );
}