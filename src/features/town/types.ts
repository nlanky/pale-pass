// LOCAL FILES
// Interfaces & Types
import type { BuildingState } from "features/building/types";
import type { Resources } from "features/resource/types";
import type { VillagerState } from "features/villager/types";

export interface TownBuilding {
  /** Matches building ID */
  id: number;
  state: BuildingState;
  /** Turns left until building is constructed */
  buildTimeRemaining: number;
  /** Turns left until building is repaired */
  repairTimeRemaining: number;
}

export interface TownVillager {
  /** Matches villager ID */
  id: number;
  state: VillagerState;
  /** Turns left until villager has recovered */
  recoveryTimeRemaining: number;
}

export interface Town {
  /** True if this belongs to player */
  isPlayer: boolean;
  tier: number;
  resources: Resources;
  resourcesPerTurn: Resources;
  /** Keeps track of building states in town */
  buildings: TownBuilding[];
  /** Keeps track of villager states in town */
  villagers: TownVillager[];
  /** Path to image location */
  image: string;
}

export interface TierRequirements {
  resources: Resources;
  buildingIds: number[];
  villagerIds: number[];
}
