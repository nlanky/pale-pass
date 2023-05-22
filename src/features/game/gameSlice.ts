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
  turn: number;
  view: View;
}

const initialState: GameState = {
  turn: 0,
  view: "menu",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<View>) => {
      state.view = action.payload;
    },
    incrementTurn: (state) => {
      state.turn += 1;
    },
  },
  extraReducers(builder) {
    builder.addCase(triggerEvent, (state) => {
      state.view = "event";
    });
  },
});

export const { incrementTurn, setView } = gameSlice.actions;

// SELECTORS
export const selectTurn = (state: RootState) => state.game.turn;
export const selectView = (state: RootState) => state.game.view;

export const gameReducer = gameSlice.reducer;
