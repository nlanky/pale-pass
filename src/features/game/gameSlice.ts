// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { PLAYER_ID } from "features/player/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
import type { View } from "features/game/types";
// Redux
import { triggerEvent } from "features/event/eventSlice";
import { exploreTile } from "features/map/mapSlice";
import { setNameAndPronouns } from "features/player/playerSlice";
import { completeBattle } from "features/combat/combatSlice";

interface GameState {
  day: number;
  view: View;
  speed: number;
  paused: boolean;
}

const initialState: GameState = {
  day: 0,
  view: "menu",
  speed: 1,
  paused: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<View>) => {
      state.view = action.payload;
    },
    incrementDay: (state) => {
      state.day += 1;
    },
    increaseGameSpeed: (state) => {
      state.speed = state.speed * 2;
    },
    decreaseGameSpeed: (state) => {
      state.speed = state.speed / 2;
    },
    togglePause: (state) => {
      state.paused = !state.paused;
    },
  },
  extraReducers(builder) {
    builder.addCase(triggerEvent, (state) => {
      state.view = "event";
    });
    builder.addCase(setNameAndPronouns, (state) => {
      // Once player has set these, we start the game
      state.view = "town";
    });
    builder.addCase(exploreTile, (state, action) => {
      const { playerId } = action.payload;
      if (playerId === PLAYER_ID) {
        // Show town view if player clicks on their town on map
        state.view = "town";
      } else if (playerId) {
        // Show combat screen if player clicks on enemy town
        state.view = "combat";
      }
    });
    builder.addCase(completeBattle, (state) => {
      state.view = "map";
    });
  },
});

export const {
  decreaseGameSpeed,
  incrementDay,
  increaseGameSpeed,
  setView,
  togglePause,
} = gameSlice.actions;

// SELECTORS
export const selectDay = (state: RootState) => state.game.day;
export const selectView = (state: RootState) => state.game.view;
export const selectGameSpeed = (state: RootState) => state.game.speed;
export const selectGamePaused = (state: RootState) =>
  state.game.paused === true;

export const gameReducer = gameSlice.reducer;
