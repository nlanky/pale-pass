// LOCAL FILES
// Interfaces & Types
import type { Resources } from "features/resource/types";

export type VillagerState =
  | "healthy"
  | "recovering"
  | "injured"
  | "dead";

export interface Villager {
  id: number;
  name: string;
  description: string;
  /** Whether player can recruit villager manually */
  canRecruit: boolean;
  occupation: string;
  /** How much of each resource we should improve gather rate by */
  gatherResources: Resources;
  /** Number of turns to recover */
  recoveryTime: number;
  /** Path to icon location */
  icon: string;
}
