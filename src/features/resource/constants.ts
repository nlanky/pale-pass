// LOCAL FILES
// Icons & Images
import {
  amethystImage,
  ironImage,
  mythrilImage,
  steelImage,
  stoneImage,
  woodImage,
} from "assets/resource";
// Interfaces & Types
import type { Resource, Resources } from "features/resource/types";
// Utility functions
import { getResources } from "features/resource/utils";

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
export const TIER_TO_RESOURCES_PER_DAY: Record<number, Resources> = {
  1: getResources({ Wood: 5, Stone: 5 }),
  2: getResources({ Iron: 5 }),
  3: getResources({ Steel: 5 }),
  4: getResources({ Mythril: 5 }),
  5: getResources({ Amethyst: 5 }),
};

export const RESOURCE_TO_IMAGE: Record<Resource, string> = {
  Wood: woodImage,
  Stone: stoneImage,
  Iron: ironImage,
  Steel: steelImage,
  Mythril: mythrilImage,
  Amethyst: amethystImage,
};

// How much 1 of the resource is worth compared to the other resources
export const RESOURCE_TO_TRADE_RATES: Record<Resource, Resources> = {
  Wood: {
    Wood: 1,
    Stone: 1,
    Iron: 1 / 20,
    Steel: 1 / 30,
    Mythril: 1 / 40,
    Amethyst: 1 / 50,
  },
  Stone: {
    Wood: 1,
    Stone: 1,
    Iron: 1 / 20,
    Steel: 1 / 30,
    Mythril: 1 / 40,
    Amethyst: 1 / 50,
  },
  Iron: {
    Wood: 20,
    Stone: 20,
    Iron: 1,
    Steel: 2 / 3,
    Mythril: 1 / 2,
    Amethyst: 2 / 5,
  },
  Steel: {
    Wood: 30,
    Stone: 30,
    Iron: 20,
    Steel: 1,
    Mythril: 3 / 4,
    Amethyst: 3 / 5,
  },
  Mythril: {
    Wood: 40,
    Stone: 40,
    Iron: 30,
    Steel: 20,
    Mythril: 1,
    Amethyst: 4 / 5,
  },
  Amethyst: {
    Wood: 50,
    Stone: 50,
    Iron: 40,
    Steel: 30,
    Mythril: 20,
    Amethyst: 1,
  },
};
