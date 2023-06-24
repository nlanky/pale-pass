// LOCAL FILES
// Constants
import { NO_VILLAGER_REQUIREMENTS } from "features/villager/constants";
// Interfaces & Types
import type { Town } from "features/town/types";
import type {
  Villager,
  VillagerRequirements,
} from "features/villager/types";

export const canRecruitVillager = (
  town: Town,
  villager: Villager,
): boolean => {
  const { tier, buildingIds, villagerIds } = villager.requirements;

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

  return true;
};

/**
 * Simple function to create a full VillagerRequirements object from a partial definition.
 */
export const getVillagerRequirements = (
  requirements: Partial<VillagerRequirements>,
): VillagerRequirements =>
  Object.assign({ ...NO_VILLAGER_REQUIREMENTS }, requirements);
