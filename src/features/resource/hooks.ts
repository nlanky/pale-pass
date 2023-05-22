// REACT
import { useEffect, useState } from "react";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { BASE_RESOURCES_PER_TURN } from "features/resource/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type { Resources } from "features/resource/types";
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectPlayerTown } from "features/town/townSlice";
// Utility functions
import { mergeResources } from "features/resource/utils";

export const usePlayerResourcesPerTurn = (): Resources => {
  // Hooks
  const town = useAppSelector(selectPlayerTown);

  // Local state
  const [resources, setResources] = useState<Resources>(
    BASE_RESOURCES_PER_TURN,
  );

  // Effects
  useEffect(() => {
    // Base gather rate + any changes from events
    let nextResources = { ...town.resourcesPerTurn };

    // Add building modifiers
    town.buildings.forEach((buildingId) => {
      const building = ID_TO_BUILDING[buildingId];
      nextResources = mergeResources(
        nextResources,
        building.resources,
      );
    });

    // Add villager modifiers
    town.villagers.forEach((villagerId) => {
      const villager = ID_TO_VILLAGER[villagerId];
      nextResources = mergeResources(
        nextResources,
        villager.resources,
      );
    });

    setResources(nextResources);
  }, [town]);

  return resources;
};
