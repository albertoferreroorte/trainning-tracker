import { Chip, Container } from '@mui/material';
import { TrackAction } from '../entities';
import { ReactElement } from 'react';
import { AddCircleOutline, AlarmOnOutlined, DeleteOutline, EditNoteOutlined, FilterAltOffOutlined, MilitaryTechOutlined } from '@mui/icons-material';

interface Props {
  filteredAction: string | null;
  handleFilter: (action: string) => void;
}

interface TrackFilter {
  action: TrackAction;
  icon: ReactElement;
}

const trackFilters: TrackFilter[] = [
  {
    action: 'All',
    icon: <FilterAltOffOutlined />,
  },
  {
    action: 'Created',
    icon: <AddCircleOutline />,
  },
  {
    action: 'Edited',
    icon: <EditNoteOutlined />,
  },
  {
    action: 'Progress',
    icon: <MilitaryTechOutlined />,
  },
  {
    action: 'Removed',
    icon: <DeleteOutline />,
  },
  {
    action: 'Started',
    icon: <AlarmOnOutlined />,
  }
];

export const TrackFiltersComponent = ({ filteredAction, handleFilter }: Props) => {
  return (
    <Container sx={{ display: 'flex', flexWrap: 'wrap' }}>
      { trackFilters.map(({ action, icon }) => (
        <Chip
          color={ filteredAction === action ? 'primary' : 'default' }
          icon={ icon }
          key={ action }
          label={ action }
          onClick={ () => handleFilter(action) }
          sx={{ marginBottom: 1, marginRight: 2 }}
        />
      )) }
    </Container>
  );
}