// LOCAL FILES
// Interfaces & Types
import type { Resources } from "features/resource/types";

export interface Town {
  isPlayer: boolean;
  tier: number;
  resources: Resources;
  buildings: string[]; // Building names
  villagers: string[]; // Villager occupations
  image: string; // Path to image location
}
