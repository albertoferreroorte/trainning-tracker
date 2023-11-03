import { Card, CardContent, Typography } from '@mui/material';
import { Track } from '../entities';

interface Props {
  track: Track;
}

export const TrackCardComponent = ({ track }: Props) => {
  return (
    <Card
      sx={{ display: 'flex', margin: 1, minWidth: 200, padding: 1 }}
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
  );
} 