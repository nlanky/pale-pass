// LOCAL FILES
// Interfaces & Types
import type { Resources } from "features/resource/types";

export interface Town {
  isPlayer: boolean;
  tier: number;
  resources: Resources;
  buildings: number[]; // Building IDs
  villagers: number[]; // Villager IDs
  image: string; // Path to image location
}
