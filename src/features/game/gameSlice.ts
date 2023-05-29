// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { RootState } from "features/redux/store";
import type { View } from "features/game/types";
// Redux
import { triggerEvent } from "features/event/eventSlice";

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
