// LOCAL FILES
// Interfaces & Types
import type { RootState } from "features/redux/store";

export const selectDay = (state: RootState) => state.system.day;
export const selectView = (state: RootState) => state.system.view;
export const selectGameSpeed = (state: RootState) =>
  state.system.speed;
export const selectGamePaused = (state: RootState) =>
  state.system.paused === true;
