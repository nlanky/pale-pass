// LOCAL FILES
// Interfaces & Types
import type { Resources } from "features/resource/types";

export const INITIAL_RESOURCES: Resources = {
  wood: 0,
  stone: 0,
  iron: 0,
  steel: 0,
  mythril: 0,
  amethyst: 0,
};

// TODO: Modify based on tier
export const BASE_RESOURCE_GATHER_RATES: Resources = {
  wood: 1,
  stone: 1,
  iron: 1,
  steel: 1,
  mythril: 1,
  amethyst: 1,
};
