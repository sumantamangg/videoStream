import { createSelector } from "@ngrx/store";

export const selectVideoState = createSelector(
    (state: any) => state, // Access the entire state
    (state) => state.video // Select the 'video' slice
  );