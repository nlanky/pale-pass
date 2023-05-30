// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { Pronouns } from "features/player/types";
import type { RootState } from "features/redux/store";

interface PlayerState {
  pronouns: Pronouns;
}

const initialState: PlayerState = {
  pronouns: {
    second: [
      {
        subject: "you",
        object: "you",
        dependentPossessive: "your",
        independentPossessive: "yours",
        reflexiveSingular: "yourself",
        reflexivePlural: "yourselves",
      },
    ],
    third: [
      {
        subject: "they",
        object: "them",
        dependentPossessive: "their",
        independentPossessive: "theirs",
        reflexiveSingular: "themself",
        reflexivePlural: "themselves",
      },
    ],
  },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPronouns: (state, action: PayloadAction<Pronouns>) => {
      state.pronouns = action.payload;
    },
  },
});

export const { setPronouns } = playerSlice.actions;

// SELECTORS
export const selectPlayerPronouns = (state: RootState) =>
  state.player.pronouns;

export const playerReducer = playerSlice.reducer;
