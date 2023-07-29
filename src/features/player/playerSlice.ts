// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { Pronouns } from "features/player/types";
import type { RootState } from "features/redux/store";
// Redux
import { setNameAndPronouns } from "features/player/actions";

interface PlayerState {
  name: string;
  pronouns: Pronouns;
}

const initialState: PlayerState = {
  name: "",
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
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setNameAndPronouns, (state, action) => {
      const { name, pronouns } = action.payload;
      state.name = name;
      state.pronouns = pronouns;
    });
  },
});

// SELECTORS
export const selectPlayerName = (state: RootState) =>
  state.player.name;
export const selectPlayerPronouns = (state: RootState) =>
  state.player.pronouns;

export const playerReducer = playerSlice.reducer;
