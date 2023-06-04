// LOCAL FILES
// Interfaces & Types
import type { Resources } from "features/resource/types";

export type BuildingState =
  | "built"
  | "under construction"
  | "being repaired"
  | "damaged"
  | "destroyed";

export interface BuildingRequirements {
  tier: number;
  buildingIds: number[];
  villagerIds: number[];
}

export interface Building {
  id: number;
  name: string;
  description: string;
  /** Whether player can build building manually */
  canBuild: boolean;
  /** Tier, building, villager requirements for building */
  requirements: BuildingRequirements;
  /** How much of each resource we should improve gather rate by */
  gatherResources: Resources;
  /** How much of each resource is required to build */
  buildResources: Resources;
  /** Number of days to build */
  buildTime: number;
  /** How much of each resource is required to repair */
  repairResources: Resources;
  /** Number of days to repair */
  repairTime: number;
  /** Paths to icon locations */
  icons: Record<BuildingState, string>;
}
