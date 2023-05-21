// LOCAL FILES
// Interfaces & Types
import { Resources } from "features/resource/types";

export interface Outcome {
  text: string; // Flavour text
  resources: Resources;
  building: {
    name: string;
    add: boolean; // If false, remove building from town
  } | null;
  villager: {
    occupation: string;
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
    buildings: string[]; // Building names
    villagers: string[]; // Villager occupations
  };
  choices: Choice[];
}
