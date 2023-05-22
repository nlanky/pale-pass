// LOCAL FILES
// Interfaces & Types
import type { Resources } from "features/resource/types";

export interface Outcome {
  text: string; // Flavour text
  resources: Resources;
  resourcesPerTurn: Resources;
  building: {
    id: number;
    add: boolean; // If false, remove building from town
  } | null;
  villager: {
    id: number;
    add: boolean; // If false, remove villager from town
  } | null;
  probability: number; // Between 0 and 1, all outcomes should add to 1
}

interface Choice {
  text: string; // For button
  outcomes: Outcome[];
}

export interface Event {
  id: number;
  image: string; // TODO: Multiple images for outcomes?
  requirements: {
    tier: number;
    resources: Resources;
    buildings: number[]; // IDs
    villagers: number[]; // IDs
  };
  introductionText: string;
  choices: Choice[];
}
