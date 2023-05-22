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

// TODO: Other players start with resources, buildings, villagers?
const INITIAL_TOWN_STATE: Town = {
  isPlayer: false,
  tier: 1,
  resources: INITIAL_RESOURCES,
  buildings: [], // IDs
  villagers: [], // IDs
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
          nextBuildings.push(building.id);
        } else {
          const buildingIndex = nextBuildings.findIndex(
            (playerBuilding) => playerBuilding === building.id,
          );
          nextBuildings.splice(buildingIndex, 1);
        }

        state.player.buildings = nextBuildings;
      }

      // Add or remove villager
      if (villager) {
        const nextVillagers = [...state.player.villagers];
        if (villager.add) {
          nextVillagers.push(villager.id);
        } else {
          const villagerIndex = nextVillagers.findIndex(
            (playerVillager) => playerVillager === villager.id,
          );
          nextVillagers.splice(villagerIndex, 1);
        }

        state.player.villagers = nextVillagers;
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
