// LOCAL FILES
// Interfaces & Types
import type { Resources } from "features/resource/types";

export const NO_RESOURCES: Resources = {
  Wood: 0,
  Stone: 0,
  Iron: 0,
  Steel: 0,
  Mythril: 0,
  Amethyst: 0,
};

/**
 * Set resource values to INCREASE in each resource when advancing tiers.
 */
export const TIER_TO_RESOURCES_PER_TURN: Record<number, Resources> = {
  1: {
    Wood: 1,
    Stone: 1,
    Iron: 0,
    Steel: 0,
    Mythril: 0,
    Amethyst: 0,
  },
  2: {
    Wood: 0,
    Stone: 0,
    Iron: 1,
    Steel: 0,
    Mythril: 0,
    Amethyst: 0,
  },
  3: {
    Wood: 0,
    Stone: 0,
    Iron: 0,
    Steel: 1,
    Mythril: 0,
    Amethyst: 0,
  },
  4: {
    Wood: 0,
    Stone: 0,
    Iron: 0,
    Steel: 0,
    Mythril: 1,
    Amethyst: 0,
  },
  5: {
    Wood: 0,
    Stone: 0,
    Iron: 0,
    Steel: 0,
    Mythril: 0,
    Amethyst: 1,
  },
};
