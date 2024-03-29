// LOCAL FILES
// Interfaces & Types
import type { BuildingState } from "features/building/types";
import type { Resources } from "features/resource/types";
import type { VillagerState } from "features/villager/types";

export interface EventRequirements {
  tier: number;
  resources: Resources;
  buildingIds: number[];
  villagerIds: number[];
}

export interface EventBuilding {
  id: number;
  state: BuildingState;
}

export interface EventVillager {
  id: number;
  state: VillagerState;
}

export interface Outcome {
  /** Text displayed to player if this outcome is reached */
  text: string; // Flavour text
  /** Resource changes */
  resources: Resources;
  /** Resource per day changes */
  resourcesPerDay: Resources;
  /** Building changes */
  buildings: EventBuilding[];
  /** Villager changes */
  villagers: EventVillager[];
  /** Probability of outcome occurring. Between 0 and 1. All outcomes should add to 1. */
  probability: number;
}

export interface Choice {
  /** Text displayed on choice button */
  text: string;
  /** List of possible outcomes given choice */
  outcomes: Outcome[];
}

export interface Event {
  id: number;
  image: string; // TODO: Multiple images for outcomes?
  requirements: EventRequirements;
  introductionText: string;
  choices: Choice[];
}

export interface CompletedEvent {
  id: number;
  choiceIndex: number;
  outcomeIndex: number;
}
