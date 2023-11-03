import { Container } from '@mui/material';
import { Track } from '../entities';
import { TrackFiltersComponent } from './track-filters';
import { TrackCardComponent } from './track-card';
import { useTrackingList } from '../../shared/hooks';

interface Props {
  groupedTracks: Track[];
}

export const TrackingListComponent = ({ groupedTracks }: Props) => {

  const { filteredAction, filteredTracks, handleFilter } = useTrackingList({ groupedTracks });

  return (
    <>
      <TrackFiltersComponent
        filteredAction={ filteredAction }
        handleFilter={ handleFilter }
      />
      <Container sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 1 }}>
        {
          filteredTracks.map((track, index) => (
            <TrackCardComponent
              key={ `${ track.id }-${ index }` }
              track={ track }
            />
          ))
        }
      </Container>
    </>
  );
}