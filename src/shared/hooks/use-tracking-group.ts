import { useEffect, useState } from 'react';
import { Track } from '../../tracking/entities';

interface Props {
  tracks: Track[];
}

export const useTrackingGroup = ({ tracks }: Props) => {

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

  return {
    trackMap,
  }
}