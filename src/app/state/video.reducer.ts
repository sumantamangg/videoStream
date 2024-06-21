// import { VideoActionTypes } from './video.action'
// import { Video } from './video.model';
// import { PLAY_VIDEO, PAUSE_VIDEO, UPDATE_CURRENT_TIME } from './video.action';


// const initialState: Video = {
//   isPlaying: true,
//   currentTime: 0,
//   duration: 0,
//   volume: 4,
//   muted: false,
//   buffered: new TimeRanges(), 
//   error: null,
// };

// export function videoReducer(state = initialState, action: VideoActionTypes): Video {
//   switch (action.type) {
//     case PLAY_VIDEO:
//       return { ...state, isPlaying: true };
//     case PAUSE_VIDEO:
//       return { ...state, isPlaying: false };
//     case UPDATE_CURRENT_TIME:
//       return { ...state, currentTime: action.payload };
//     default:
//       return state;
//   }
// }
import { createReducer, on } from '@ngrx/store';
import * as VideoActions from './video.action';
import { Video } from './video.model';

const initialState: Video = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 4,
  muted: false,
  // buffered: new TimeRanges(), 
  error: null,
};
export const videoReducer = createReducer(
  initialState,
  on(VideoActions.playVideo, (state) => ({ ...state, isPlaying: true })),
  on(VideoActions.pauseVideo, (state) => ({ ...state, isPlaying: false })),
  // on(VideoActions.setCurrentTime, (state, { currentTime }) => ({ ...state, currentTime })),
  // on(VideoActions.setVolume, (state, { volume }) => ({ ...state, volume })),
  // on(VideoActions.toggleMute, (state) => ({ ...state, muted: !state.muted })),
  // on(VideoActions.setBuffered, (state, { buffered }) => ({ ...state, buffered })),
  // on(VideoActions.setError, (state, { error }) => ({ ...state, error })),
  // on(VideoActions.setVideoUrl, (state, { videoUrl }) => ({ ...state, videoUrl }))
);
