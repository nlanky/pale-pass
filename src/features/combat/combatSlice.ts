// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { PLAYER_ID } from "features/player/constants";
// Interfaces & Types
import type { BattleOutcome } from "features/combat/types";
import type { RootState } from "features/redux/store";
// Redux
import { exploreTile } from "features/map/mapSlice";

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
  reducers: {
    completeBattle: (state, action: PayloadAction<BattleOutcome>) => {
      if (
        action.payload.victoryState === "victory" &&
        state.attackingPlayerId
      ) {
        state.conqueredPlayerIds = [
          ...state.conqueredPlayerIds,
          state.attackingPlayerId,
        ];
      }

      state.attackingPlayerId = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(exploreTile, (state, action) => {
      const { playerId } = action.payload;
      if (playerId !== PLAYER_ID) {
        state.attackingPlayerId = playerId;
      }
    });
  },
});

export const { completeBattle } = combatSlice.actions;

// SELECTORS
export const selectAttackingPlayerId = (state: RootState) =>
  state.combat.attackingPlayerId;
export const selectConqueredPlayerIds = (state: RootState) =>
  state.combat.conqueredPlayerIds;

export const combatReducer = combatSlice.reducer;
