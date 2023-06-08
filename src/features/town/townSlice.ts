// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import {
  NO_RESOURCES,
  TIER_TO_RESOURCES_PER_DAY,
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
import { completeBattle } from "features/combat/combatSlice";
import { completeEvent } from "features/event/eventSlice";
import { incrementDay } from "features/game/gameSlice";
import { exploreTile } from "features/map/mapSlice";
// Utility functions
import {
  getResources,
  mergeResources,
} from "features/resource/utils";
import { getNextDayResources } from "features/town/utils";

interface TownState {
  player: Town;
}

const INITIAL_TOWN_STATE: Town = {
  playerId: 1,
  tier: 1,
  resources: NO_RESOURCES,
  resourcesPerDay: TIER_TO_RESOURCES_PER_DAY[1],
  buildings: [],
  villagers: [],
  image: "",
};

const initialState: TownState = {
  player: { ...INITIAL_TOWN_STATE },
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

      // Assign new tier and increase base resources per day
      state.player.tier = newTier;
      state.player.resourcesPerDay = mergeResources(
        state.player.resourcesPerDay,
        TIER_TO_RESOURCES_PER_DAY[newTier],
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
        const numberOfBuilders = state.player.villagers.filter(
          (villager) =>
            ID_TO_VILLAGER[villager.id].specialty === "Builder" &&
            villager.state === "healthy",
        ).length;
        nextBuildings.push({
          id,
          state: "under construction",
          buildTimeRemaining: Math.max(
            buildTime - numberOfBuilders,
            1,
          ),
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
    recruitVillager: (state, action: PayloadAction<number>) => {
      const villagerId = action.payload;
      const nextVillagers = [...state.player.villagers];
      const existingVillagerIndex = nextVillagers.findIndex(
        (existingVillager) => existingVillager.id === villagerId,
      );
      if (existingVillagerIndex === -1) {
        nextVillagers.push({
          id: villagerId,
          state: "healthy",
          recoveryTimeRemaining: 0,
        });
      }

      state.player.villagers = nextVillagers;
    },
    healVillager: (state, action: PayloadAction<number>) => {
      const villagerId = action.payload;
      const nextVillagers = [...state.player.villagers];
      const existingVillagerIndex = nextVillagers.findIndex(
        (existingVillager) => existingVillager.id === villagerId,
      );
      if (existingVillagerIndex !== -1) {
        nextVillagers[existingVillagerIndex].state = "recovering";
      }

      state.player.villagers = nextVillagers;
    },
  },
  extraReducers(builder) {
    builder.addCase(incrementDay, (state) => {
      state.player.resources = getNextDayResources(state.player);

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
      const { resources, resourcesPerDay, buildings, villagers } =
        action.payload;

      // Modify resources
      state.player.resources = mergeResources(
        state.player.resources,
        resources,
      );

      // Modify resources per day
      state.player.resourcesPerDay = mergeResources(
        state.player.resourcesPerDay,
        resourcesPerDay,
      );

      // Update buildings
      const nextTownBuildings = [...state.player.buildings];
      const numberOfBuilders = state.player.villagers.filter(
        (villager) =>
          ID_TO_VILLAGER[villager.id].specialty === "Builder" &&
          villager.state === "healthy",
      ).length;
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
            state === "destroyed"
              ? Math.max(building.buildTime - numberOfBuilders, 1)
              : 0,
          repairTimeRemaining:
            state === "damaged"
              ? Math.max(building.repairTime - numberOfBuilders, 1)
              : 0,
        });
      });
      state.player.buildings = nextTownBuildings;

      // Update villagers
      const nextTownVillagers = [...state.player.villagers];
      const numberOfHealers = nextTownVillagers.filter(
        (villager) =>
          ID_TO_VILLAGER[villager.id].specialty === "Healer" &&
          villager.state === "healthy",
      ).length;
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
        nextTownVillagers.push({
          id,
          state,
          recoveryTimeRemaining:
            state === "injured"
              ? Math.max(8 - numberOfHealers, 1)
              : 0,
        });
      });
      state.player.villagers = nextTownVillagers;
    });
    builder.addCase(exploreTile, (state, action) => {
      if (action.payload.resources) {
        const nextResources = mergeResources(
          state.player.resources,
          action.payload.resources,
        );
        state.player.resources = nextResources;
      }
    });
    builder.addCase(completeBattle, (state, action) => {
      const nextTownVillagers = [...state.player.villagers];
      action.payload.villagers.forEach((villager) => {
        const villagerIndex = nextTownVillagers.findIndex(
          (townVillager) => townVillager.id === villager.id,
        );
        if (villagerIndex !== -1) {
          nextTownVillagers[villagerIndex].state = villager.state;
        }
      });

      state.player.villagers = nextTownVillagers;
    });
  },
});

export const {
  advanceTier,
  buildBuilding,
  healVillager,
  recruitVillager,
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
export const selectPlayerScouts = (state: RootState) =>
  state.town.player.villagers.filter(
    (villager) =>
      villager.state === "healthy" &&
      ID_TO_VILLAGER[villager.id].specialty === "Scout",
  ).length;
export const selectPlayerSpies = (state: RootState) =>
  state.town.player.villagers.filter(
    (villager) =>
      villager.state === "healthy" &&
      ID_TO_VILLAGER[villager.id].specialty === "Spy",
  ).length;

export const townReducer = townSlice.reducer;
