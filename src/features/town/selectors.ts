// PUBLIC MODULES
import { createSelector } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import {
  BUILDING_ID_CARTROGRAPHER,
  ID_TO_BUILDING,
} from "features/building/constants";
import {
  DAYS_PER_EVENT,
  EVENT_ID_TO_EVENT,
} from "features/event/constants";
import { TIER_TO_RESOURCES_PER_DAY } from "features/resource/constants";
import {
  TIER_TO_ENABLED_RESOURCES,
  TIER_TO_REQUIREMENTS,
} from "features/town/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
// Redux
import { selectDay } from "features/system/selectors";
// Utility functions
import { getRandomEvent } from "features/event/utils";
import {
  canAffordResourceAmount,
  mergeResources,
} from "features/resource/utils";
import { getNumberOfBuilders } from "features/town/utils";

export const selectTownTier = (state: RootState) => state.town.tier;
export const selectTownResources = (state: RootState) =>
  state.town.resources;
export const selectTownBuildingIdToBuilding = (state: RootState) =>
  state.town.buildingIdToBuilding;
export const selectTownVillagerIdToVillager = (state: RootState) =>
  state.town.villagerIdToVillager;
export const selectCompletedEvents = (state: RootState) =>
  state.town.completedEvents;

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

export const selectTownResourcesPerDay = createSelector(
  [
    selectTownTier,
    selectCompletedEvents,
    selectFunctionalTownBuildings,
    selectFunctionalTownVillagers,
  ],
  (townTier, completedEvents, townBuildings, townVillagers) => {
    // Base gather rate dependent on tier
    let resourcesPerDay = { ...TIER_TO_RESOURCES_PER_DAY[townTier] };

    // Add event modifiers
    completedEvents.forEach((completedEvent) => {
      const { id, choiceIndex, outcomeIndex } = completedEvent;
      resourcesPerDay = mergeResources(
        resourcesPerDay,
        EVENT_ID_TO_EVENT[id].choices[choiceIndex].outcomes[
          outcomeIndex
        ].resourcesPerDay,
      );
    });

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

/*
  Filter event list to return only valid events. Each event has a set of
  requirements that town must meet. Player must also not have seen event
  before.
*/
export const selectValidEvents = createSelector(
  [
    selectCompletedEvents,
    selectTownTier,
    selectTownResources,
    selectTownBuildingIds,
    selectTownVillagerIds,
  ],
  (
    completedEvents,
    townTier,
    townResources,
    townBuildingIds,
    townVillagerIds,
  ) =>
    Object.values(EVENT_ID_TO_EVENT).filter((event) => {
      const { id, requirements } = event;
      const { tier, resources, buildingIds, villagerIds } =
        requirements;

      if (
        completedEvents.find(
          (completedEvent) => completedEvent.id === id,
        )
      ) {
        return false;
      }

      if (townTier < tier) {
        return false;
      }

      if (
        townResources.Wood < resources.Wood ||
        townResources.Stone < resources.Stone ||
        townResources.Iron < resources.Iron ||
        townResources.Steel < resources.Steel ||
        townResources.Mythril < resources.Mythril ||
        townResources.Amethyst < resources.Amethyst
      ) {
        return false;
      }

      if (
        !buildingIds.every((buildingId) =>
          townBuildingIds.includes(buildingId),
        )
      ) {
        return false;
      }

      if (
        !villagerIds.every((villagerId) =>
          townVillagerIds.includes(villagerId),
        )
      ) {
        return false;
      }

      return true;
    }),
);

export const selectCanExplore = createSelector(
  [selectDay, selectValidEvents, selectCompletedEvents],
  (day, validEvents, completedEvents) =>
    day !== 0 &&
    validEvents.length !== 0 &&
    (completedEvents.length === 0 ||
      Math.ceil(day / completedEvents.length) > DAYS_PER_EVENT),
);

// Returns random valid event
export const selectValidEvent = createSelector(
  [selectValidEvents],
  (validEvents) =>
    validEvents.length === 0 ? null : getRandomEvent(validEvents),
);
