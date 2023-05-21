// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { RootState } from "features/redux/store";
import type { View } from "features/game/types";

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
});

export const { incrementTurn, setView } = gameSlice.actions;

export const selectView = (state: RootState) => state.game.view;

export default gameSlice.reducer;
