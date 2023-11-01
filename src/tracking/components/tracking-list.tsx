import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { SectionTitleComponent } from '../../shared/components';
import { Track } from '../entities/track';

export const TrackingListComponent = () => {
  const trackings = [
    new Track('Added', Date.now(), 'Course', 'Course A'),
    new Track('Added', Date.now(), 'Lesson', 'Lesson B'),
  ];

  const trackMap: Map<string, Track[]> = new Map();

  trackings.forEach((track) => {
    const { date } = track;
    const tracksForDate = trackMap.get(date) || [];
    trackMap.set(date, [...tracksForDate, track]);
  });

  return (
    <Box sx={{ margin: 10 }}>
      <SectionTitleComponent
        length={ trackings.length }
        name='Trackings'
      />
      {
        [...trackMap.entries()].map(([date, groupedTracks]) => (
          <Container
            key={ date }
            sx={{ alignSelf: 'start', display: 'flex', flexDirection: 'column', width: '100%'}}
          >
            <Typography gutterBottom variant="h4">{ date }</Typography>
            <Container sx={{ display: 'flex', flexWrap: 'nowrap' }}>
              {
                groupedTracks.map((track, index) => (
                  <Card
                    key={ `${ track.id }-${ index }` }
                    sx={{ display: 'flex', margin: 1, padding: 1 }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        { track.action }
                      </Typography>
                      <Typography gutterBottom paragraph>
                        { track.targetLabel }
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              }
            </Container>
          </Container>
        ))
      }
    </Box>
  );
}