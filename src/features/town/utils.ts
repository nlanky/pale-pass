// LOCAL FILES
// Constants
import { BASE_RESOURCE_GATHER_RATES } from "features/resource/constants";
// Interfaces & Types
import type { Resources } from "features/resource/types";
import type { Town } from "features/town/types";
// Utility functions
import { mergeResources } from "features/resource/utils";

export const getNextTurnResources = (town: Town): Resources => {
  // Add base gather rate
  let nextTurnResources = mergeResources(
    town.resources,
    BASE_RESOURCE_GATHER_RATES,
  );

  // Add building modifiers
  town.buildings.forEach((building) => {
    nextTurnResources = mergeResources(
      nextTurnResources,
      building.resources,
    );
  });

  // Add villager modifiers
  town.villagers.forEach((villager) => {
    nextTurnResources = mergeResources(
      nextTurnResources,
      villager.resources,
    );
  });

  return nextTurnResources;
};
