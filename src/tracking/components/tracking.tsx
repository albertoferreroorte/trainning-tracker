import { Box, Container, Typography } from '@mui/material';
import { SectionTitleComponent } from '../../shared/components';
import { useTrack, useTrackingGroup } from '../../shared/hooks';
import { TrackingListComponent } from './tracking-list';

export const TrackingComponent = () => {

  const { tracks } = useTrack();

  const { trackMap } = useTrackingGroup({ tracks });

  return (
    <Box sx={{ margin: 10 }}>
      <SectionTitleComponent
        length={ tracks.length }
        name='Trackings'
      />
      {
        [...trackMap.entries()].map(([date, groupedTracks]) => (
          <Container
            key={ date }
            sx={{ alignSelf: 'start', display: 'flex', flexDirection: 'column', width: '100%'}}
          >
            <Typography gutterBottom variant="h4">{ date }</Typography>
            <TrackingListComponent groupedTracks={ groupedTracks } />
          </Container>
        ))
      }
    </Box>
  );
}