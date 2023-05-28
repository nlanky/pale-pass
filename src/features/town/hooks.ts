// LOCAL FILES
// Constants
import { TIER_TO_REQUIREMENTS } from "features/town/constants";
// Interfaces & Types
import type { Resource } from "features/resource/types";
import type { TierRequirements } from "features/town/types";
// Redux
import { useAppSelector } from "features/redux/hooks";
import { selectPlayerTown } from "features/town/townSlice";
// Utility functions
import { mergeResources } from "features/resource/utils";

export const useCanAdvanceTier = (): boolean => {
  // Hooks
  const town = useAppSelector(selectPlayerTown);

  // Player has reached max tier
  if (town.tier === 5) {
    return false;
  }

  const { resources, buildingIds, villagerIds } =
    TIER_TO_REQUIREMENTS[town.tier + 1];

  // Check player has required buildings
  const townBuildingIds = town.buildings.map(
    (building) => building.id,
  );
  const hasBuildings =
    buildingIds.filter((buildingId) =>
      townBuildingIds.includes(buildingId),
    ).length === buildingIds.length;
  if (!hasBuildings) {
    return false;
  }

  // Check player has required villagers
  const townVillagerIds = town.villagers.map(
    (villager) => villager.id,
  );
  const hasVillagers =
    villagerIds.filter((villagerId) =>
      townVillagerIds.includes(villagerId),
    ).length === villagerIds.length;
  if (!hasVillagers) {
    return false;
  }

  // Check player has enough resources
  const resourcesAfterAdvance = mergeResources(
    town.resources,
    resources,
  );
  for (const resource in resourcesAfterAdvance) {
    if (resourcesAfterAdvance[resource as Resource] < 0) {
      return false;
    }
  }

  return true;
};

export const useTierRequirements = (): TierRequirements | null => {
  // Hooks
  const town = useAppSelector(selectPlayerTown);

  if (town.tier === 5) {
    return null;
  }

  return TIER_TO_REQUIREMENTS[town.tier + 1];
};
