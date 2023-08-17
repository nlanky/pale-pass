// LOCAL FILES
// Interfaces & Types
import type { RootState } from "features/redux/store";

export const selectDay = (state: RootState) => state.game.day;
export const selectView = (state: RootState) => state.game.view;
export const selectGameSpeed = (state: RootState) => state.game.speed;
export const selectGamePaused = (state: RootState) =>
  state.game.paused === true;
