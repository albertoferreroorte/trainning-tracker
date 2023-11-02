import { selectAllTracks } from '../../store/track';
import { useAppSelector } from './use-app-selector';

export const useTrack = () => {
  
  const tracks = useAppSelector(state => selectAllTracks(state));

  return {
    tracks,
  };
};

