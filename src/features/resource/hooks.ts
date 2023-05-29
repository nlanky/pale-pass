// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type { Resources } from "features/resource/types";
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectPlayerTown } from "features/town/townSlice";
// Utility functions
import { mergeResources } from "features/resource/utils";

export const usePlayerResourcesPerDay = (): Resources => {
  // Hooks
  const town = useAppSelector(selectPlayerTown);

  // Base gather rate + any changes from events
  let resources = { ...town.resourcesPerDay };

  // Add building modifiers
  town.buildings.forEach((townBuilding) => {
    const { id, state } = townBuilding;

    // Building must not be under construction, being repaired, damaged or destroyed
    if (state !== "built") {
      return;
    }

    const building = ID_TO_BUILDING[id];
    resources = mergeResources(resources, building.gatherResources);
  });

  // Add villager modifiers
  town.villagers.forEach((townVillager) => {
    const { id, state } = townVillager;

    // Villager must not be recovering, injured or dead
    if (state != "healthy") {
      return;
    }

    const villager = ID_TO_VILLAGER[id];
    resources = mergeResources(resources, villager.gatherResources);
  });

  return resources;
};
