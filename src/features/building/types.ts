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

export type BuildingImage = "exterior" | "interior" | "sketch";

export interface Building {
  id: number;
  name: string;
  text: {
    /** Text that will show before player has built/discovered building */
    preBuild: string;
    /** Text that will show after player has built/discovered building */
    postBuild: string;
  };
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
  /** Paths to image locations */
  images: Record<BuildingImage, string>;
}

export type BuildingNotificationType = "built" | "repaired";
