// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { PLAYER_ID } from "features/player/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
// Redux
import { completeBattle } from "features/combat/actions";
import { exploreTile } from "features/map/actions";

interface CombatState {
  /** ID of enemy that player is attacking */
  attackingPlayerId: number | null;
  /** List of conquered players */
  conqueredPlayerIds: number[];
}

const initialState: CombatState = {
  attackingPlayerId: null,
  conqueredPlayerIds: [],
};

export const combatSlice = createSlice({
  name: "combat",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(completeBattle, (state, action) => {
        if (
          action.payload.victoryState === "Victory" &&
          state.attackingPlayerId
        ) {
          state.conqueredPlayerIds = [
            ...state.conqueredPlayerIds,
            state.attackingPlayerId,
          ];
        }

        state.attackingPlayerId = null;
      })
      .addCase(exploreTile, (state, action) => {
        const { playerId } = action.payload;
        if (playerId !== PLAYER_ID) {
          state.attackingPlayerId = playerId;
        }
      });
  },
});

// SELECTORS
export const selectAttackingPlayerId = (state: RootState) =>
  state.combat.attackingPlayerId;
export const selectConqueredPlayerIds = (state: RootState) =>
  state.combat.conqueredPlayerIds;

export const combatReducer = combatSlice.reducer;
