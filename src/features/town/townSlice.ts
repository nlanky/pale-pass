// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { INITIAL_RESOURCES } from "features/resource/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
import type { Town } from "features/town/types";
// Utility functions
import { getNextTurnResources } from "features/town/utils";

interface TownState {
  player: Town;
  otherPlayers: Town[];
}

// TODO: Other players start with resources?
const INITIAL_TOWN_STATE: Town = {
    isPlayer: false,
    tier: 1,
    resources: INITIAL_RESOURCES,
    buildings: [],
    villagers: [],
    image: "",
};

const initialState: TownState = {
  player: {...INITIAL_TOWN_STATE, isPlayer: true},
  otherPlayers: [],
};

export const townSlice = createSlice({
  name: "town",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase("game/incrementTurn", (state) => {
        state.player.resources = getNextTurnResources(state.player);
      });
  }
});

export const {} = townSlice.actions;

export const selectPlayerResources = (state: RootState) => state.town.player.resources;

export default townSlice.reducer;
