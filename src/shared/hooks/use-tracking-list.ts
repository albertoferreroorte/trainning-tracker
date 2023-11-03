import { useState } from 'react';
import { Track } from '../../tracking/entities';

interface Props {
  groupedTracks: Track[];
}

export const useTrackingList = ({ groupedTracks }: Props) => {
  
  const [filteredAction, setFilteredAction] = useState<string>('All');
  
  const handleFilter = (action = '') => {
    setFilteredAction(action);
  };

  const filteredTracks = filteredAction === 'All'
    ? groupedTracks
    : groupedTracks.filter((track) => track.action === filteredAction);

  return {
    filteredAction,
    filteredTracks,
    handleFilter,
  }
}