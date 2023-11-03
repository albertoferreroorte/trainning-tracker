import { Box } from '@mui/material';
import { ProjectDescriptionComponent } from '../../shared/components';
import { ColumnLayout } from '../../shared/layout/column-layout';
import { TrackingComponent } from '../components';

export const TrackingPage = () => {
  return (
    <>
      <ColumnLayout layout="tertiary">
        <TrackingComponent />
      </ColumnLayout>
      <Box marginBottom={ 10 }>
        <ProjectDescriptionComponent />
      </Box>
    </>
  );
}