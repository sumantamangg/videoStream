import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Video } from './video.model';

export const initialState: Video = {
  isPlaying: true,
  currentTime: 0,
  duration: 0,
  volume: 1, // Default to full volume
  muted: false,
//   buffered: new TimeRanges(), // Initialize empty TimeRanges
  error: null,
};

export const videoFeature = createFeatureSelector<Video>('video');

export const selectIsPlaying = createSelector(videoFeature, (state) => state.isPlaying);
export const selectCurrentTime = createSelector(videoFeature, (state) => state.currentTime);
export const selectDuration = createSelector(videoFeature, (state) => state.duration);
export const selectVolume = createSelector(videoFeature, (state) => state.volume);
export const selectMuted = createSelector(videoFeature, (state) => state.muted);
// export const selectBuffered = createSelector(videoFeature, (state) => state.buffered);
export const selectError = createSelector(videoFeature, (state) => state.error);
