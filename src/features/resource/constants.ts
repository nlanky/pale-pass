// LOCAL FILES
// Images
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
  1: { ...NO_RESOURCES, Wood: 5, Stone: 5 },
  2: { ...NO_RESOURCES, Iron: 5 },
  3: { ...NO_RESOURCES, Steel: 5 },
  4: { ...NO_RESOURCES, Mythril: 5 },
  5: { ...NO_RESOURCES, Amethyst: 5 },
};

// TODO: Replace with actual icons
export const RESOURCE_TO_ICON: Record<Resource, string> = {
  Wood: woodImage,
  Stone: stoneImage,
  Iron: ironImage,
  Steel: steelImage,
  Mythril: mythrilImage,
  Amethyst: amethystImage,
};

// How much 1 of the resource is worth compared to the other resources
// TODO: Determine rates so it can't be exploited
export const RESOURCE_TO_TRADE_RATES: Record<Resource, Resources> = {
  Wood: {
    Wood: 1,
    Stone: 1,
    Iron: 1,
    Steel: 1,
    Mythril: 1,
    Amethyst: 1,
  },
  Stone: {
    Wood: 1,
    Stone: 1,
    Iron: 1,
    Steel: 1,
    Mythril: 1,
    Amethyst: 1,
  },
  Iron: {
    Wood: 1,
    Stone: 1,
    Iron: 1,
    Steel: 1,
    Mythril: 1,
    Amethyst: 1,
  },
  Steel: {
    Wood: 1,
    Stone: 1,
    Iron: 1,
    Steel: 1,
    Mythril: 1,
    Amethyst: 1,
  },
  Mythril: {
    Wood: 1,
    Stone: 1,
    Iron: 1,
    Steel: 1,
    Mythril: 1,
    Amethyst: 1,
  },
  Amethyst: {
    Wood: 1,
    Stone: 1,
    Iron: 1,
    Steel: 1,
    Mythril: 1,
    Amethyst: 1,
  },
};
