// LOCAL FILES
// Interfaces & Types
import type { RootState } from "features/redux/store";

export const selectPlayerName = (state: RootState) =>
  state.player.name;
export const selectPlayerPronouns = (state: RootState) =>
  state.player.pronouns;
