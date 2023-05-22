// LOCAL FILES
// Interfaces & Types
import type { Resources } from "features/resource/types";

export const INITIAL_RESOURCES: Resources = {
  Wood: 0,
  Stone: 0,
  Iron: 0,
  Steel: 0,
  Mythril: 0,
  Amethyst: 0,
};

// TODO: Modify based on tier
export const BASE_RESOURCE_GATHER_RATES: Resources = {
  Wood: 1,
  Stone: 1,
  Iron: 1,
  Steel: 1,
  Mythril: 1,
  Amethyst: 1,
};
