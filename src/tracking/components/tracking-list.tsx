import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { SectionTitleComponent } from '../../shared/components';
import { Track } from '../entities/track';
import { useTrack } from '../../shared/hooks';

export const TrackingListComponent = () => {

  const { tracks } = useTrack();

  const [ trackMap, setTrackMap ] = useState<Map<string, Track[]>>(new Map());

  useEffect(() => {
    const newTrackMap = new Map();
    tracks.map((track) => {
      const { date } = track;
      const tracksForDate = newTrackMap.get(date) || [];
      newTrackMap.set(date, [...tracksForDate, track]);
    });
    setTrackMap(newTrackMap);
  }, [tracks]);

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
            <Container sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {
                groupedTracks.map((track, index) => (
                  <Card
                    key={ `${ track.id }-${ index }` }
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', display: 'flex', margin: 1, minWidth: 200, padding: 1 }}
                  >
                    <CardContent>
                      <Typography variant="overline" display="block" gutterBottom>
                        { track.action }
                      </Typography>
                      {
                        track.target.map((t, index) => (
                          <Typography key={ index } gutterBottom paragraph>{ t }</Typography>
                        ))
                      }
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