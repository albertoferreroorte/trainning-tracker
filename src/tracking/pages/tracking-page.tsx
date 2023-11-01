import { ProjectDescriptionComponent } from '../../shared/components';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { TrackingListComponent } from '../components';

export const TrackingPage = () => {
  return (
    <>
      <ColumnLayout layout="tertiary">
        <TrackingListComponent />
      </ColumnLayout>
      <ProjectDescriptionComponent />
    </>
  );
}