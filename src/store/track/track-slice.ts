import { EntityState, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Track } from '../../tracking/entities/track';

export interface TrackState extends EntityState<Track> {}

export const trackAdapter = createEntityAdapter<Track>();

const initialState: TrackState = trackAdapter.getInitialState();

export const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
      addTrack: trackAdapter.addOne,
    }
});

export const {
  addTrack
} = trackSlice.actions;

export const {
  selectAll: selectAllTracks,
} = trackAdapter.getSelectors((state: RootState) => state.track);