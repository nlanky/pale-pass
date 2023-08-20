// LOCAL FILES
// Constants
import {
  ID_TO_BUILDING,
  NO_BUILDING_REQUIREMENTS,
} from "features/building/constants";
// Interfaces & Types
import type {
  Building,
  BuildingRequirements,
} from "features/building/types";
import type { TownBuilding } from "features/town/types";

/**
 * Simple function to create a full BuildingRequirements object from a partial definition.
 */
export const getBuildingRequirements = (
  requirements: Partial<BuildingRequirements>,
): BuildingRequirements =>
  Object.assign({ ...NO_BUILDING_REQUIREMENTS }, requirements);

export const sortBuildings = (
  buildingA: Building,
  buildingB: Building,
): number => {
  const { tier: tierA } = buildingA.requirements;
  const { tier: tierB } = buildingB.requirements;
  if (tierA === tierB) {
    return buildingA.id < buildingB.id ? -1 : 1;
  }

  return tierA < tierB ? -1 : 1;
};

export const sortTownBuildings = (
  buildingA: TownBuilding,
  buildingB: TownBuilding,
): number => {
  const { tier: tierA } = ID_TO_BUILDING[buildingA.id].requirements;
  const { tier: tierB } = ID_TO_BUILDING[buildingB.id].requirements;
  if (tierA === tierB) {
    return buildingA.id < buildingB.id ? -1 : 1;
  }

  return tierA < tierB ? -1 : 1;
};
