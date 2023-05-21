// LOCAL FILES
// Interfaces & Types
import type { Resources } from "features/resource/types";

export interface Villager {
  name: string;
  occupation: string; // TODO: Improve typing
  resources: Resources; // How much of each resource we should improve gather rate by
  text: {
    join: string;
    comment: string; // TODO: Could be array to give more variety and flavour?
    leave: string;
  };
  image: string; // Path to image location
}
