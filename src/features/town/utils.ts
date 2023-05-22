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
  town.buildings.forEach((buildingId) => {
    const building = ID_TO_BUILDING[buildingId];
    nextTurnResources = mergeResources(
      nextTurnResources,
      building.resources,
    );
  });

  // Add villager modifiers
  town.villagers.forEach((villagerId) => {
    const villager = ID_TO_VILLAGER[villagerId];
    nextTurnResources = mergeResources(
      nextTurnResources,
      villager.resources,
    );
  });

  return nextTurnResources;
};
