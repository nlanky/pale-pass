// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { PLAYER_ID } from "features/player/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
import type { View } from "features/game/types";
// Redux
import { completeBattle } from "features/combat/actions";
import { triggerEvent } from "features/event/actions";
import {
  decreaseGameSpeed,
  increaseGameSpeed,
  setDay,
  setView,
  togglePause,
} from "features/game/actions";
import { exploreTile } from "features/map/actions";
import { setNameAndPronouns } from "features/player/actions";

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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setView, (state, action) => {
        state.view = action.payload;
      })
      .addCase(setDay, (state, action) => {
        state.day = action.payload;
      })
      .addCase(increaseGameSpeed, (state) => {
        state.speed = state.speed * 2;
      })
      .addCase(decreaseGameSpeed, (state) => {
        state.speed = state.speed / 2;
      })
      .addCase(togglePause, (state) => {
        state.paused = !state.paused;
      })
      .addCase(triggerEvent, (state) => {
        state.view = "event";
      })
      .addCase(setNameAndPronouns, (state) => {
        // Once player has set these, we start the game
        state.view = "town";
      })
      .addCase(exploreTile, (state, action) => {
        const { playerId } = action.payload;
        if (playerId === PLAYER_ID) {
          // Show town view if player clicks on their town on map
          state.view = "town";
        } else if (playerId) {
          // Show combat screen if player clicks on enemy town
          state.view = "combat";
        }
      })
      .addCase(completeBattle, (state) => {
        state.view = "map";
      });
  },
});

// SELECTORS
export const selectDay = (state: RootState) => state.game.day;
export const selectView = (state: RootState) => state.game.view;
export const selectGameSpeed = (state: RootState) => state.game.speed;
export const selectGamePaused = (state: RootState) =>
  state.game.paused === true;

export const gameReducer = gameSlice.reducer;
