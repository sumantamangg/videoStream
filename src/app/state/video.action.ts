// export const PLAY_VIDEO = 'PLAY_VIDEO';
// export const PAUSE_VIDEO = 'PAUSE_VIDEO';
// export const UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME';

// export interface PlayVideoAction {
//   type: typeof PLAY_VIDEO;
// }

// export interface PauseVideoAction {
//   type: typeof PAUSE_VIDEO;
// }

// export interface UpdateCurrentTimeAction {
//   type: typeof UPDATE_CURRENT_TIME;
//   payload: number; // New currentTime value
// }

// export type VideoActionTypes = PlayVideoAction | PauseVideoAction | UpdateCurrentTimeAction;

// export const playVideo = (): PlayVideoAction => ({
//   type: PLAY_VIDEO,
// });

// export const pauseVideo = (): PauseVideoAction => ({
//   type: PAUSE_VIDEO,
// });

// export const updateCurrentTime = (currentTime: number): UpdateCurrentTimeAction => ({
//   type: UPDATE_CURRENT_TIME,
//   payload: currentTime,
// });

import { createAction, props } from '@ngrx/store';

export const playVideo = createAction('[Video] Play Video');
export const pauseVideo = createAction('[Video] Pause Video');
export const setCurrentTime = createAction('[Video] Set Current Time', props<{ currentTime: number }>)
