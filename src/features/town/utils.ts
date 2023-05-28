// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
// Interfaces & Types
import type { Resources } from "features/resource/types";
import type { Town } from "features/town/types";
// Utility functions
import { mergeResources } from "features/resource/utils";
import { ID_TO_VILLAGER } from "features/villager/constants";

export const getNextTurnResources = (town: Town): Resources => {
  // Add base resources per turn
  let nextTurnResources = mergeResources(
    town.resources,
    town.resourcesPerTurn,
  );

  // Add building modifiers
  town.buildings.forEach((townBuilding) => {
    const { id, state } = townBuilding;

    // Building must not be under construction, being repaired, damaged or destroyed
    if (state !== "built") {
      return;
    }

    const building = ID_TO_BUILDING[id];
    nextTurnResources = mergeResources(
      nextTurnResources,
      building.gatherResources,
    );
  });

  // Add villager modifiers
  town.villagers.forEach((townVillager) => {
    const { id, state } = townVillager;

    // Villager must not be recovering, injured or dead
    if (state != "healthy") {
      return;
    }

    const villager = ID_TO_VILLAGER[id];
    nextTurnResources = mergeResources(
      nextTurnResources,
      villager.gatherResources,
    );
  });

  return nextTurnResources;
};
