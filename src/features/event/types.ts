// LOCAL FILES
// Interfaces & Types
import type { BuildingState } from "features/building/types";
import type { Resources } from "features/resource/types";
import type { VillagerState } from "features/villager/types";

export interface Outcome {
  /** Text displayed to player if this outcome is reached */
  text: string; // Flavour text
  /** Resource changes */
  resources: Resources;
  /** Resource per turn changes */
  resourcesPerTurn: Resources;
  /** Building changes */
  buildings: { id: number; state: BuildingState }[];
  /** Villager changes */
  villagers: { id: number; state: VillagerState }[];
  /** Probability of outcome occurring. Between 0 and 1. All outcomes should add to 1. */
  probability: number;
}

interface Choice {
  /** Text displayed on choice button */
  text: string;
  /** List of possible outcomes given choice */
  outcomes: Outcome[];
}

export interface Event {
  id: number;
  image: string; // TODO: Multiple images for outcomes?
  requirements: {
    tier: number;
    resources: Resources;
    buildingIds: number[];
    villagerIds: number[];
  };
  introductionText: string;
  choices: Choice[];
}
