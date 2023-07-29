// LOCAL FILES
// Constants
import { NO_BUILDING_REQUIREMENTS } from "features/building/constants";
import type { BuildingRequirements } from "features/building/types";

/**
 * Simple function to create a full BuildingRequirements object from a partial definition.
 */
export const getBuildingRequirements = (
  requirements: Partial<BuildingRequirements>,
): BuildingRequirements =>
  Object.assign({ ...NO_BUILDING_REQUIREMENTS }, requirements);
