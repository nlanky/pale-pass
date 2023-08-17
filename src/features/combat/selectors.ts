// LOCAL FILES
// Interfaces & Types
import type { RootState } from "features/redux/store";

export const selectAttackingPlayerId = (state: RootState) =>
  state.combat.attackingPlayerId;
export const selectConqueredPlayerIds = (state: RootState) =>
  state.combat.conqueredPlayerIds;
