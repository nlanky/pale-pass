// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
// Interfaces & Types
import type { Resources } from "features/resource/types";
import type { Town, TownVillager } from "features/town/types";
// Utility functions
import { mergeResources } from "features/resource/utils";
import { ID_TO_VILLAGER } from "features/villager/constants";

export const getNextDayResources = (town: Town): Resources => {
  // Add base resources per day, this includes any modifiers from events
  let nextDayResources = mergeResources(
    town.resources,
    town.resourcesPerDay,
  );

  // Add building modifiers
  Object.values(town.buildingIdToBuilding).forEach((townBuilding) => {
    const { id, state } = townBuilding;

    // Building must not be under construction, being repaired, damaged or destroyed
    if (state !== "built") {
      return;
    }

    const building = ID_TO_BUILDING[id];
    nextDayResources = mergeResources(
      nextDayResources,
      building.gatherResources,
    );
  });

  // Add villager modifiers
  Object.values(town.villagerIdToVillager).forEach((townVillager) => {
    const { id, state } = townVillager;

    // Villager must not be recovering, injured or dead
    if (state != "healthy") {
      return;
    }

    const villager = ID_TO_VILLAGER[id];
    nextDayResources = mergeResources(
      nextDayResources,
      villager.gatherResources,
    );
  });

  return nextDayResources;
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
