// LOCAL FILES
// Interfaces & Types
import type { Resources } from "features/resource/types";

export type Occupation = "Blacksmith"; // TODO: Populate when new villagers are added

export interface Villager {
  id: number;
  name: string;
  occupation: Occupation;
  resources: Resources; // How much of each resource we should improve gather rate by
  text: {
    join: string;
    comment: string; // TODO: Could be array to give more variety and flavour?
    leave: string;
  };
  image: string; // Path to image location
}
