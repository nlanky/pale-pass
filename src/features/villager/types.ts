// LOCAL FILES
// Interfaces & Types
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

export interface Villager {
  id: number;
  name: string;
  occupation: string;
  description: string;
  /** Whether player can recruit villager manually */
  canRecruit: boolean;
  /** Tier, building, villager requirements for villager */
  requirements: VillagerRequirements;
  /** How much of each resource we should improve gather rate by */
  gatherResources: Resources;
  /** Paths to icon locations */
  icons: Record<VillagerState, string>;
}
