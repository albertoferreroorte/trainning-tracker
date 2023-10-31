import { ProjectDescriptionComponent } from '../../shared/components';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { AddCourseView, CoursesView, EditCourseView } from '../views';

export const CoursesPage = () => {
  return (
    <ColumnLayout>
      <AddCourseView />
      <ColumnLayout>
        <CoursesView />
        <ColumnLayout>
          <EditCourseView />
        </ColumnLayout>
        <ProjectDescriptionComponent />
      </ColumnLayout>
    </ColumnLayout>
  );
}