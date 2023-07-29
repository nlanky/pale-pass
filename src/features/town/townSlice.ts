// PUBLIC MODULES
import { createSelector, createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import {
  BUILDING_ID_CARTROGRAPHER,
  ID_TO_BUILDING,
} from "features/building/constants";
import {
  NO_RESOURCES,
  TIER_TO_RESOURCES_PER_DAY,
  RESOURCE_TO_TRADE_RATES,
} from "features/resource/constants";
import {
  TIER_TO_ENABLED_RESOURCES,
  TIER_TO_REQUIREMENTS,
} from "features/town/constants";
import {
  ID_TO_VILLAGER,
  VILLAGER_RECOVERY_DAYS,
} from "features/villager/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
import type { Town } from "features/town/types";
// Redux
import { completeBattle } from "features/combat/actions";
import { completeEvent } from "features/event/actions";
import { setDay } from "features/game/actions";
import { exploreTile } from "features/map/actions";
import {
  buildBuilding,
  healVillager,
  recruitVillager,
  repairBuilding,
  setTier,
  tradeResources,
} from "features/town/actions";
// Utility functions
import {
  canAffordResourceAmount,
  getResources,
  mergeResources,
} from "features/resource/utils";
import {
  getNextDayResources,
  getNumberOfBuilders,
  getNumberOfHealers,
} from "features/town/utils";

interface TownState extends Town {}

const initialState: TownState = {
  playerId: 1,
  tier: 1,
  resources: NO_RESOURCES,
  resourcesPerDay: TIER_TO_RESOURCES_PER_DAY[1],
  buildingIdToBuilding: {},
  villagerIdToVillager: {},
  image: "",
};

export const townSlice = createSlice({
  name: "town",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setTier, (state, action) => {
        const newTier = action.payload;

        // Player pays cost in resources to advance tier
        state.resources = mergeResources(
          state.resources,
          TIER_TO_REQUIREMENTS[newTier].resources,
        );

        // Assign new tier and increase base resources per day
        state.tier = newTier;
        state.resourcesPerDay = mergeResources(
          state.resourcesPerDay,
          TIER_TO_RESOURCES_PER_DAY[newTier],
        );
      })
      .addCase(tradeResources, (state, action) => {
        const { fromResource, toResource, quantity } = action.payload;
        const resourceChanges = getResources({
          [fromResource]: -quantity,
          [toResource]:
            quantity *
            RESOURCE_TO_TRADE_RATES[fromResource][toResource],
        });
        state.resources = mergeResources(
          state.resources,
          resourceChanges,
        );
      })
      .addCase(buildBuilding, (state, action) => {
        const buildingId = action.payload;
        const { id, buildTime, buildResources } =
          ID_TO_BUILDING[buildingId];
        const nextBuildingIdToBuilding = {
          ...state.buildingIdToBuilding,
        };

        // Check if this building is in town but destroyed
        if (nextBuildingIdToBuilding[buildingId]) {
          // Start rebuild
          nextBuildingIdToBuilding[buildingId].state =
            "under construction";
        } else {
          // Start construction of new building
          const numberOfBuilders = getNumberOfBuilders(
            state.villagerIdToVillager,
          );
          nextBuildingIdToBuilding[buildingId] = {
            id,
            state: "under construction",
            buildTimeRemaining: Math.max(
              buildTime - numberOfBuilders,
              1,
            ),
            repairTimeRemaining: 0,
          };
        }

        state.buildingIdToBuilding = nextBuildingIdToBuilding;
        state.resources = mergeResources(
          { ...state.resources },
          buildResources,
        );
      })
      .addCase(repairBuilding, (state, action) => {
        const buildingId = action.payload;
        const { repairResources } = ID_TO_BUILDING[buildingId];
        const nextBuildingIdToBuilding = {
          ...state.buildingIdToBuilding,
        };
        if (nextBuildingIdToBuilding[buildingId]) {
          nextBuildingIdToBuilding[buildingId].state =
            "being repaired";
        }

        state.buildingIdToBuilding = nextBuildingIdToBuilding;
        state.resources = mergeResources(
          { ...state.resources },
          repairResources,
        );
      })
      .addCase(recruitVillager, (state, action) => {
        const villagerId = action.payload;
        const nextVillagerIdToVillager = {
          ...state.villagerIdToVillager,
        };
        if (!nextVillagerIdToVillager[villagerId]) {
          nextVillagerIdToVillager[villagerId] = {
            id: villagerId,
            state: "healthy",
            recoveryTimeRemaining: 0,
          };
        }

        state.villagerIdToVillager = nextVillagerIdToVillager;
      })
      .addCase(healVillager, (state, action) => {
        const villagerId = action.payload;
        const nextVillagerIdToVillager = {
          ...state.villagerIdToVillager,
        };
        if (nextVillagerIdToVillager[villagerId]) {
          nextVillagerIdToVillager[villagerId].state = "recovering";
        }

        state.villagerIdToVillager = nextVillagerIdToVillager;
      })
      .addCase(setDay, (state) => {
        state.resources = getNextDayResources(state);

        // Check building repair/building times
        const nextBuildingIdToBuilding = {
          ...state.buildingIdToBuilding,
        };
        Object.entries(nextBuildingIdToBuilding).forEach(
          (buildingEntry) => {
            const buildingId = Number(buildingEntry[0]);
            const nextTownBuilding = { ...buildingEntry[1] };
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
            nextBuildingIdToBuilding[buildingId] = nextTownBuilding;
          },
        );
        state.buildingIdToBuilding = nextBuildingIdToBuilding;

        // Check villager recovery times
        const nextVillagerIdToVillager = {
          ...state.villagerIdToVillager,
        };
        Object.entries(nextVillagerIdToVillager).forEach(
          (villagerEntry) => {
            const villagerId = Number(villagerEntry[0]);
            const nextTownVillager = { ...villagerEntry[1] };
            const { state } = nextTownVillager;
            if (state === "recovering") {
              nextTownVillager.recoveryTimeRemaining--;
              if (nextTownVillager.recoveryTimeRemaining === 0) {
                nextTownVillager.state = "healthy";
              }
            }

            nextVillagerIdToVillager[villagerId] = nextTownVillager;
          },
        );
        state.villagerIdToVillager = nextVillagerIdToVillager;
      })
      .addCase(completeEvent, (state, action) => {
        const { resources, resourcesPerDay, buildings, villagers } =
          action.payload.outcome;

        // Modify resources
        state.resources = mergeResources(state.resources, resources);

        // Modify resources per day
        state.resourcesPerDay = mergeResources(
          state.resourcesPerDay,
          resourcesPerDay,
        );

        // Update buildings
        const nextBuildingIdToBuilding = {
          ...state.buildingIdToBuilding,
        };
        const numberOfBuilders = getNumberOfBuilders(
          state.villagerIdToVillager,
        );
        buildings.forEach((eventBuilding) => {
          const { id, state } = eventBuilding;

          // Add/replace building state
          const building = ID_TO_BUILDING[id];
          nextBuildingIdToBuilding[id] = {
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
          };
        });
        state.buildingIdToBuilding = nextBuildingIdToBuilding;

        // Update villagers
        const nextVillagerIdToVillager = {
          ...state.villagerIdToVillager,
        };
        const numberOfHealers = getNumberOfHealers(
          state.villagerIdToVillager,
        );
        villagers.forEach((eventVillager) => {
          const { id, state } = eventVillager;

          // Add/replace villager state
          nextVillagerIdToVillager[id] = {
            id,
            state,
            recoveryTimeRemaining:
              state === "injured"
                ? Math.max(
                    VILLAGER_RECOVERY_DAYS - numberOfHealers,
                    1,
                  )
                : 0,
          };
        });
        state.villagerIdToVillager = nextVillagerIdToVillager;
      })
      .addCase(exploreTile, (state, action) => {
        if (action.payload.resources) {
          const nextResources = mergeResources(
            state.resources,
            action.payload.resources,
          );
          state.resources = nextResources;
        }
      })
      .addCase(completeBattle, (state, action) => {
        const nextVillagerIdToVillager = {
          ...state.villagerIdToVillager,
        };
        action.payload.villagers.forEach((villager) => {
          if (nextVillagerIdToVillager[villager.id]) {
            nextVillagerIdToVillager[villager.id].state =
              villager.state;
          }
        });

        state.villagerIdToVillager = nextVillagerIdToVillager;
      });
  },
});

// SELECTORS
export const selectTownTier = (state: RootState) => state.town.tier;
export const selectTownResources = (state: RootState) =>
  state.town.resources;
export const selectTownResourcesPerDay = (state: RootState) =>
  state.town.resourcesPerDay;
export const selectTownBuildingIdToBuilding = (state: RootState) =>
  state.town.buildingIdToBuilding;
export const selectTownVillagerIdToVillager = (state: RootState) =>
  state.town.villagerIdToVillager;

export const selectTierRequirements = createSelector(
  [selectTownTier],
  (tier) => TIER_TO_REQUIREMENTS[tier + 1],
);

export const selectEnabledResources = createSelector(
  [selectTownTier],
  (tier) => TIER_TO_ENABLED_RESOURCES[tier],
);

export const selectTownBuildingIds = createSelector(
  [selectTownBuildingIdToBuilding],
  (buildingIdToBuilding) =>
    Object.keys(buildingIdToBuilding).map((buildingId) =>
      Number(buildingId),
    ),
);
export const selectTownBuildings = createSelector(
  [selectTownBuildingIdToBuilding],
  (buildingIdToBuilding) => Object.values(buildingIdToBuilding),
);
export const selectTownBuilding = (buildingId: number) =>
  createSelector(
    [selectTownBuildingIdToBuilding],
    (buildingIdToBuilding) => buildingIdToBuilding[buildingId],
  );
export const selectTownHasCartographer = createSelector(
  [selectTownBuildings],
  (buildings) =>
    buildings.some(
      (building) => building.id === BUILDING_ID_CARTROGRAPHER,
    ),
);
export const selectFunctionalTownBuildings = createSelector(
  [selectTownBuildings],
  (buildings) =>
    buildings.filter((building) => building.state === "built"),
);
export const selectFunctionalTownBuildingIds = createSelector(
  [selectFunctionalTownBuildings],
  (buildings) => buildings.map((building) => building.id),
);
// Returns all buildings that should be available to player at this point in game
export const selectAvailableBuildings = createSelector(
  [selectTownTier, selectTownBuildingIdToBuilding],
  (tier, buildingIdToBuilding) =>
    Object.values(ID_TO_BUILDING)
      .filter(
        (building) =>
          buildingIdToBuilding[building.id] ||
          (building.canBuild && building.requirements.tier <= tier),
      )
      .sort((buildingA, buildingB) => {
        const { tier: tierA } = buildingA.requirements;
        const { tier: tierB } = buildingB.requirements;
        if (tierA === tierB) {
          return buildingA.name < buildingB.name ? -1 : 1;
        }

        return tierA < tierB ? -1 : 1;
      }),
);

export const selectTownVillagerIds = createSelector(
  [selectTownVillagerIdToVillager],
  (villagerIdToVillager) =>
    Object.keys(villagerIdToVillager).map((villagerId) =>
      Number(villagerId),
    ),
);
export const selectTownVillagers = createSelector(
  [selectTownVillagerIdToVillager],
  (villagerIdToVillager) => Object.values(villagerIdToVillager),
);
export const selectTownVillager = (villagerId: number) =>
  createSelector(
    [selectTownVillagerIdToVillager],
    (villagerIdToVillager) => villagerIdToVillager[villagerId],
  );
export const selectTownScouts = createSelector(
  [selectTownVillagers],
  (villagers) =>
    villagers.filter(
      (villager) =>
        villager.state === "healthy" &&
        ID_TO_VILLAGER[villager.id].specialty === "Scout",
    ).length,
);
export const selectTownSpies = createSelector(
  [selectTownVillagers],
  (villagers) =>
    villagers.filter(
      (villager) =>
        villager.state === "healthy" &&
        ID_TO_VILLAGER[villager.id].specialty === "Spy",
    ).length,
);
export const selectTownBuilders = createSelector(
  [selectTownVillagerIdToVillager],
  (villagerIdToVillager) => getNumberOfBuilders(villagerIdToVillager),
);
export const selectFunctionalTownVillagers = createSelector(
  [selectTownVillagers],
  (villagers) =>
    villagers.filter((villager) => villager.state === "healthy"),
);
export const selectFunctionalTownVillagerIds = createSelector(
  [selectFunctionalTownVillagers],
  (villagers) => villagers.map((villager) => villager.id),
);
// Returns all villagers that should be available to player at this point in game
export const selectAvailableVillagers = createSelector(
  [selectTownTier, selectTownVillagerIdToVillager],
  (tier, villagerIdToVillager) =>
    Object.values(ID_TO_VILLAGER)
      .filter(
        (villager) =>
          villagerIdToVillager[villager.id] ||
          (villager.canRecruit && villager.requirements.tier <= tier),
      )
      .sort((villagerA, villagerB) => {
        const { tier: tierA } = villagerA.requirements;
        const { tier: tierB } = villagerB.requirements;
        if (tierA === tierB) {
          return villagerA.name < villagerB.name ? -1 : 1;
        }

        return tierA < tierB ? -1 : 1;
      }),
);

export const selectCombinedTownResourcesPerDay = createSelector(
  [
    selectTownResourcesPerDay,
    selectFunctionalTownBuildings,
    selectFunctionalTownVillagers,
  ],
  (townResourcesPerDay, townBuildings, townVillagers) => {
    // Base gather rate + any changes from events
    let resourcesPerDay = { ...townResourcesPerDay };

    // Add building modifiers
    townBuildings.forEach((townBuilding) => {
      const building = ID_TO_BUILDING[townBuilding.id];
      resourcesPerDay = mergeResources(
        resourcesPerDay,
        building.gatherResources,
      );
    });

    // Add villager modifiers
    townVillagers.forEach((townVillager) => {
      const villager = ID_TO_VILLAGER[townVillager.id];
      resourcesPerDay = mergeResources(
        resourcesPerDay,
        villager.gatherResources,
      );
    });

    return resourcesPerDay;
  },
);
export const selectCanAdvanceTier = createSelector(
  [
    selectTownTier,
    selectTierRequirements,
    selectFunctionalTownBuildingIds,
    selectFunctionalTownVillagerIds,
    selectTownResources,
  ],
  (
    townTier,
    tierRequirements,
    townBuildingIds,
    townVillagerIds,
    townResources,
  ) =>
    townTier !== 5 &&
    tierRequirements.buildingIds.every((buildingId) =>
      townBuildingIds.includes(buildingId),
    ) &&
    tierRequirements.villagerIds.every((villagerId) =>
      townVillagerIds.includes(villagerId),
    ) &&
    canAffordResourceAmount(
      townResources,
      tierRequirements.resources,
    ),
);

export const townReducer = townSlice.reducer;
