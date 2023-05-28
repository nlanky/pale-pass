// LOCAL FILES
// Constants
import { NO_RESOURCES } from "features/resource/constants";
// Interfaces & Types
import type { Resource } from "features/resource/types";
import type { TierRequirements } from "features/town/types";
// Utility functions
import { getResources } from "features/resource/utils";

/**
 * Player must have the building and villagers in their town. They must
 * also pay a fixed amount of resources to advance.
 */
export const TIER_TO_REQUIREMENTS: Record<number, TierRequirements> =
  {
    1: {
      resources: NO_RESOURCES,
      buildingIds: [],
      villagerIds: [],
    },
    2: {
      resources: getResources({ Wood: -20, Stone: -20 }),
      buildingIds: [],
      villagerIds: [],
    },
    3: {
      resources: getResources({
        Wood: -20,
        Stone: -20,
        Iron: -20,
      }),
      buildingIds: [],
      villagerIds: [],
    },
    4: {
      resources: getResources({
        Wood: -20,
        Stone: -20,
        Iron: -20,
        Steel: -20,
      }),
      buildingIds: [],
      villagerIds: [],
    },
    5: {
      resources: getResources({
        Wood: -20,
        Stone: -20,
        Iron: -20,
        Mythril: -20,
      }),
      buildingIds: [],
      villagerIds: [],
    },
  };

/**
 * Start off with 2 resources and add 1 per tier.
 */
export const TIER_TO_ENABLED_RESOURCES: Record<number, Resource[]> = {
  1: ["Wood", "Stone"],
  2: ["Wood", "Stone", "Iron"],
  3: ["Wood", "Stone", "Iron", "Steel"],
  4: ["Wood", "Stone", "Iron", "Steel", "Mythril"],
  5: ["Wood", "Stone", "Iron", "Steel", "Mythril", "Amethyst"],
};
