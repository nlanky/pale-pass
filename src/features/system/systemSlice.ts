// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { PLAYER_ID } from "features/player/constants";
// Interfaces & Types
import type { View } from "features/system/types";
// Redux
import { completeBattle } from "features/combat/actions";
import { triggerEvent } from "features/event/actions";
import {
  decreaseGameSpeed,
  increaseGameSpeed,
  setDay,
  setView,
  togglePause,
} from "features/system/actions";
import { exploreTile } from "features/map/actions";
import { setNameAndPronouns } from "features/player/actions";
import { setTier } from "features/town/actions";

interface SystemState {
  day: number;
  view: View;
  speed: number;
  paused: boolean;
}

const initialState: SystemState = {
  day: 0,
  view: "menu",
  speed: 1,
  paused: false,
};

export const systemSlice = createSlice({
  name: "system",
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
      })
      .addCase(setTier, (state) => {
        state.view = "tier";
      });
  },
});

export const systemReducer = systemSlice.reducer;
