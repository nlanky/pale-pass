// LOCAL FILES
// Constants
import { NO_VILLAGER_REQUIREMENTS } from "features/villager/constants";
// Interfaces & Types
import type { VillagerRequirements } from "features/villager/types";

/**
 * Simple function to create a full VillagerRequirements object from a partial definition.
 */
export const getVillagerRequirements = (
  requirements: Partial<VillagerRequirements>,
): VillagerRequirements =>
  Object.assign({ ...NO_VILLAGER_REQUIREMENTS }, requirements);
