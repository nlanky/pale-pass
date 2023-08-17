// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { EVENT_ID_TO_EVENT } from "features/event/constants";
import { TIER_TO_RESOURCES_PER_DAY } from "features/resource/constants";
// Interfaces & Types
import type { Resources } from "features/resource/types";
import type { Town, TownVillager } from "features/town/types";
// Utility functions
import { mergeResources } from "features/resource/utils";
import { ID_TO_VILLAGER } from "features/villager/constants";

export const getTownResourcesPerDay = (town: Town): Resources => {
  // Base gather rate dependent on tier
  let resourcesPerDay = { ...TIER_TO_RESOURCES_PER_DAY[town.tier] };

  // Add event modifiers
  town.completedEvents.forEach((completedEvent) => {
    const { id, choiceIndex, outcomeIndex } = completedEvent;
    resourcesPerDay = mergeResources(
      resourcesPerDay,
      EVENT_ID_TO_EVENT[id].choices[choiceIndex].outcomes[
        outcomeIndex
      ].resourcesPerDay,
    );
  });

  // Add building modifiers
  Object.values(town.buildingIdToBuilding).forEach((townBuilding) => {
    // Building must not be under construction, being repaired, damaged or destroyed
    if (townBuilding.state !== "built") {
      return;
    }

    const building = ID_TO_BUILDING[townBuilding.id];
    resourcesPerDay = mergeResources(
      resourcesPerDay,
      building.gatherResources,
    );
  });

  // Add villager modifiers
  Object.values(town.villagerIdToVillager).forEach((townVillager) => {
    // Villager must not be recovering, injured or dead
    if (townVillager.state != "healthy") {
      return;
    }

    const villager = ID_TO_VILLAGER[townVillager.id];
    resourcesPerDay = mergeResources(
      resourcesPerDay,
      villager.gatherResources,
    );
  });

  return resourcesPerDay;
};

export const getNumberOfBuilders = (
  villagerIdToVillager: Record<number, TownVillager>,
): number =>
  Object.values(villagerIdToVillager).filter(
    (villager) =>
      villager.state === "healthy" &&
      ID_TO_VILLAGER[villager.id].specialty === "Builder",
  ).length;

export const getNumberOfHealers = (
  villagerIdToVillager: Record<number, TownVillager>,
): number =>
  Object.values(villagerIdToVillager).filter(
    (villager) =>
      ID_TO_VILLAGER[villager.id].specialty === "Healer" &&
      villager.state === "healthy",
  ).length;
