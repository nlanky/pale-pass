// LOCAL FILES
// Interfaces & Types
import type { Town } from "features/town/types";
import type { Building } from "features/building/types";
// Utility functions
import { canAffordResourceAmount } from "features/resource/utils";

export const canBuildBuilding = (
  town: Town,
  building: Building,
): boolean => {
  const { buildResources, requirements } = building;
  const { tier, buildingIds, villagerIds } = requirements;

  if (town.tier < tier) {
    return false;
  }

  // Check player has required buildings
  const townBuildingIds = town.buildings
    .filter((townBuilding) => townBuilding.state === "built")
    .map((townBuilding) => townBuilding.id);
  const hasBuildings =
    buildingIds.filter((buildingId) =>
      townBuildingIds.includes(buildingId),
    ).length === buildingIds.length;
  if (!hasBuildings) {
    return false;
  }

  // Check player has required villagers
  const townVillagerIds = town.villagers
    .filter((villager) => villager.state === "healthy")
    .map((villager) => villager.id);
  const hasVillagers =
    villagerIds.filter((villagerId) =>
      townVillagerIds.includes(villagerId),
    ).length === villagerIds.length;
  if (!hasVillagers) {
    return false;
  }

  // Check player has enough resources
  if (!canAffordResourceAmount(town.resources, buildResources)) {
    return false;
  }

  return true;
};
