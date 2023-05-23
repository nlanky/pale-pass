// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import {
  NO_RESOURCES,
  TIER_TO_RESOURCES_PER_TURN,
} from "features/resource/constants";
import {
  TIER_TO_ENABLED_RESOURCES,
  TIER_TO_REQUIREMENTS,
} from "features/town/constants";
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
  resources: NO_RESOURCES,
  resourcesPerTurn: TIER_TO_RESOURCES_PER_TURN[1],
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
  reducers: {
    advanceTier: (state) => {
      const newTier = state.player.tier + 1;

      // Player pays cost in resources to advance tier
      state.player.resources = mergeResources(
        state.player.resources,
        TIER_TO_REQUIREMENTS[newTier].resources,
      );

      // Assign new tier and increase base resources per turn
      state.player.tier = newTier;
      state.player.resourcesPerTurn = mergeResources(
        state.player.resourcesPerTurn,
        TIER_TO_RESOURCES_PER_TURN[newTier],
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(incrementTurn, (state) => {
      state.player.resources = getNextTurnResources(state.player);
    });
    builder.addCase(completeEvent, (state, action) => {
      const { resources, resourcesPerTurn, building, villager } =
        action.payload;

      // Modify resources
      state.player.resources = mergeResources(
        state.player.resources,
        resources,
      );

      // Modify resources per turn
      state.player.resourcesPerTurn = mergeResources(
        state.player.resourcesPerTurn,
        resourcesPerTurn,
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

export const { advanceTier } = townSlice.actions;

// SELECTORS
export const selectPlayerTown = (state: RootState) =>
  state.town.player;
export const selectPlayerResources = (state: RootState) =>
  state.town.player.resources;
export const selectEnabledResources = (state: RootState) =>
  TIER_TO_ENABLED_RESOURCES[state.town.player.tier];

export const townReducer = townSlice.reducer;
