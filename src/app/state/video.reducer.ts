
import { createReducer, on } from '@ngrx/store';
import * as VideoActions from './video.action';
import { Video } from './video.model';

const initialState: Video = {
  isPlaying: true,
  currentTime: 0,
  duration: 0,
  volume: 4,
  muted: false,
  error: null,
};
export const videoReducer = createReducer(
  initialState,
  on(VideoActions.playVideo, (state) => ({ ...state, isPlaying: true })),
  on(VideoActions.pauseVideo, (state) => ({ ...state, isPlaying: false })),
);
