// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import {
  NO_RESOURCES,
  TIER_TO_RESOURCES_PER_TURN,
  RESOURCE_TO_TRADE_RATES,
} from "features/resource/constants";
import {
  TIER_TO_ENABLED_RESOURCES,
  TIER_TO_REQUIREMENTS,
} from "features/town/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
import type { Resource } from "features/resource/types";
import type { Town } from "features/town/types";
// Redux
import { completeEvent } from "features/event/eventSlice";
import { incrementTurn } from "features/game/gameSlice";
// Utility functions
import {
  getResources,
  mergeResources,
} from "features/resource/utils";
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
    tradeResources: (
      state,
      action: PayloadAction<{
        fromResource: Resource;
        toResource: Resource;
        quantity: number;
      }>,
    ) => {
      const { fromResource, toResource, quantity } = action.payload;
      const resourceChanges = getResources({
        [fromResource]: -quantity,
        [toResource]:
          quantity *
          RESOURCE_TO_TRADE_RATES[fromResource][toResource],
      });
      state.player.resources = mergeResources(
        state.player.resources,
        resourceChanges,
      );
    },
    buildBuilding: (state, action: PayloadAction<number>) => {
      const buildingId = action.payload;
      const { id, buildTime, buildResources } =
        ID_TO_BUILDING[buildingId];
      const nextBuildings = [...state.player.buildings];

      // Check if this building is in town but destroyed
      const existingBuildingIndex = nextBuildings.findIndex(
        (existingBuilding) => existingBuilding.id === buildingId,
      );
      if (existingBuildingIndex !== -1) {
        // Start rebuild
        nextBuildings[existingBuildingIndex].state =
          "under construction";
      } else {
        // Start construction of new building
        nextBuildings.push({
          id,
          state: "under construction",
          buildTimeRemaining: buildTime,
          repairTimeRemaining: 0,
        });
      }

      state.player.buildings = nextBuildings;
      state.player.resources = mergeResources(
        { ...state.player.resources },
        buildResources,
      );
    },
    repairBuilding: (state, action: PayloadAction<number>) => {
      const buildingId = action.payload;
      const { repairResources } = ID_TO_BUILDING[buildingId];
      const nextBuildings = [...state.player.buildings];
      const existingBuildingIndex = nextBuildings.findIndex(
        (existingBuilding) => existingBuilding.id === buildingId,
      );
      if (existingBuildingIndex !== -1) {
        nextBuildings[existingBuildingIndex].state = "being repaired";
      }

      state.player.buildings = nextBuildings;
      state.player.resources = mergeResources(
        { ...state.player.resources },
        repairResources,
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(incrementTurn, (state) => {
      state.player.resources = getNextTurnResources(state.player);

      // Check building repair/building times
      const nextTownBuildings = [...state.player.buildings];
      nextTownBuildings.forEach(
        (townBuilding, index, townBuildings) => {
          const nextTownBuilding = { ...townBuilding };
          const { state } = nextTownBuilding;
          if (state === "under construction") {
            nextTownBuilding.buildTimeRemaining--;
            if (nextTownBuilding.buildTimeRemaining === 0) {
              nextTownBuilding.state = "built";
            }
          } else if (state === "being repaired") {
            nextTownBuilding.repairTimeRemaining--;
            if (nextTownBuilding.repairTimeRemaining === 0) {
              nextTownBuilding.state = "built";
            }
          }

          townBuildings[index] = nextTownBuilding;
        },
      );
      state.player.buildings = nextTownBuildings;

      // Check villager recovery times
      const nextTownVillagers = [...state.player.villagers];
      nextTownVillagers.forEach(
        (townVillager, index, townVillagers) => {
          const nextTownVillager = { ...townVillager };
          const { state } = nextTownVillager;
          if (state === "recovering") {
            nextTownVillager.recoveryTimeRemaining--;
            if (nextTownVillager.recoveryTimeRemaining === 0) {
              nextTownVillager.state = "healthy";
            }
          }

          townVillagers[index] = nextTownVillager;
        },
      );
      state.player.villagers = nextTownVillagers;
    });
    builder.addCase(completeEvent, (state, action) => {
      const { resources, resourcesPerTurn, buildings, villagers } =
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

      // Update buildings
      const nextTownBuildings = [...state.player.buildings];
      buildings.forEach((townBuilding) => {
        const { id, state } = townBuilding;

        // Remove old building state
        const existingBuildingIndex = nextTownBuildings.findIndex(
          (existingBuilding) => existingBuilding.id === id,
        );
        if (existingBuildingIndex !== -1) {
          nextTownBuildings.splice(existingBuildingIndex, 1);
        }

        // Add new building state
        const building = ID_TO_BUILDING[id];
        nextTownBuildings.push({
          id,
          state,
          buildTimeRemaining:
            state === "destroyed" ? building.buildTime : 0,
          repairTimeRemaining:
            state === "damaged" ? building.repairTime : 0,
        });
      });
      state.player.buildings = nextTownBuildings;

      // Update villagers
      const nextTownVillagers = [...state.player.villagers];
      villagers.forEach((townVillager) => {
        const { id, state } = townVillager;

        // Remove old villager state
        const existingVillagerIndex = nextTownVillagers.findIndex(
          (existingVillager) => existingVillager.id === id,
        );
        if (existingVillagerIndex !== -1) {
          nextTownVillagers.splice(existingVillagerIndex, 1);
        }

        // Add new villager state
        const villager = ID_TO_VILLAGER[id];
        nextTownVillagers.push({
          id,
          state,
          recoveryTimeRemaining:
            state === "injured" ? villager.recoveryTime : 0,
        });
      });
      state.player.villagers = nextTownVillagers;
    });
  },
});

export const {
  advanceTier,
  buildBuilding,
  repairBuilding,
  tradeResources,
} = townSlice.actions;

// SELECTORS
export const selectPlayerTown = (state: RootState) =>
  state.town.player;
export const selectPlayerResources = (state: RootState) =>
  state.town.player.resources;
export const selectEnabledResources = (state: RootState) =>
  TIER_TO_ENABLED_RESOURCES[state.town.player.tier];
export const selectPlayerBuildings = (state: RootState) =>
  state.town.player.buildings;
export const selectPlayerVillagers = (state: RootState) =>
  state.town.player.villagers;

export const townReducer = townSlice.reducer;
