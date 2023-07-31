// LOCAL FILES
// Interfaces & Types
import type { MilitaryStrength } from "features/combat/types";
import type { Resources } from "features/resource/types";

export type VillagerState =
  | "healthy"
  | "recovering"
  | "injured"
  | "dead";

export interface VillagerRequirements {
  tier: number;
  buildingIds: number[];
  villagerIds: number[];
}

export type VillagerSpecialty =
  | "Builder"
  | "Gatherer"
  | "Healer"
  | "Scout"
  | "Soldier"
  | "Spy";

export interface Villager {
  id: number;
  name: string;
  occupation: string;
  description: string;
  /** Villager's specialty which dictates their ability */
  specialty: VillagerSpecialty;
  /** Whether player can recruit villager manually */
  canRecruit: boolean;
  /** Tier, building, villager requirements for villager */
  requirements: VillagerRequirements;
  /** How much of each resource we should improve gather rate by */
  gatherResources: Resources;
  /** How competent a villager is at each type of combat */
  militaryStrength: MilitaryStrength;
  /** Path to image location */
  image: string;
}

export type VillagerNotificationType = "healed";
