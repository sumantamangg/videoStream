import { createAction, props } from '@ngrx/store';

export const playVideo = createAction('[Video] Play Video');
export const pauseVideo = createAction('[Video] Pause Video');
export const setCurrentTime = createAction('[Video] Set Current Time', props<{ currentTime: number }>);
