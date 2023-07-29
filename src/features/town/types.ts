// LOCAL FILES
// Interfaces & Types
import type { BuildingState } from "features/building/types";
import type { Resources } from "features/resource/types";
import type { VillagerState } from "features/villager/types";

export interface TownBuilding {
  /** Matches building ID */
  id: number;
  state: BuildingState;
  /** Days left until building is constructed */
  buildTimeRemaining: number;
  /** Days left until building is repaired */
  repairTimeRemaining: number;
}

export interface TownVillager {
  /** Matches villager ID */
  id: number;
  state: VillagerState;
  /** Days left until villager has recovered */
  recoveryTimeRemaining: number;
}

export interface Town {
  /** ID of player this town belongs to */
  playerId: number;
  tier: number;
  resources: Resources;
  resourcesPerDay: Resources;
  /** Keeps track of building states in town */
  buildingIdToBuilding: Record<number, TownBuilding>;
  /** Keeps track of villager states in town */
  villagerIdToVillager: Record<number, TownVillager>;
  /** Path to image location */
  image: string;
}

export interface TierRequirements {
  resources: Resources;
  buildingIds: number[];
  villagerIds: number[];
}
