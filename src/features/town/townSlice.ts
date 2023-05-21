// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { INITIAL_RESOURCES } from "features/resource/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
import type { Town } from "features/town/types";
// Redux
import { completeEvent } from "features/event/eventSlice";
import { incrementTurn } from "features/game/gameSlice";
// Utility functions
import { mergeResources } from "features/resource/utils";
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
  player: { ...INITIAL_TOWN_STATE, isPlayer: true },
  otherPlayers: [],
};

export const townSlice = createSlice({
  name: "town",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(incrementTurn, (state) => {
      state.player.resources = getNextTurnResources(state.player);
    });
    builder.addCase(completeEvent, (state, action) => {
      const { resources, building, villager } =
        action.payload.chosenOutcome;
      // Modify resources by amounts in outcome
      state.player.resources = mergeResources(
        state.player.resources,
        resources,
      );

      // Add or remove building
      if (building) {
        const nextBuildings = [...state.player.buildings];
        if (building.add) {
          nextBuildings.push(building.name);
        } else {
          const buildingIndex = nextBuildings.findIndex(
            (playerBuilding) => playerBuilding === building.name,
          );
          nextBuildings.splice(buildingIndex, 1);
        }

        state.player.buildings = nextBuildings;
      }

      // Add or remove villager
      if (villager) {
        const nextvillagers = [...state.player.villagers];
        if (villager.add) {
          nextvillagers.push(villager.occupation);
        } else {
          const villagerIndex = nextvillagers.findIndex(
            (playervillager) =>
              playervillager === villager.occupation,
          );
          nextvillagers.splice(villagerIndex, 1);
        }

        state.player.villagers = nextvillagers;
      }
    });
  },
});

// export const {} = townSlice.actions;

// SELECTORS
export const selectPlayerTown = (state: RootState) =>
  state.town.player;
export const selectPlayerResources = (state: RootState) =>
  state.town.player.resources;

export const townReducer = townSlice.reducer;
