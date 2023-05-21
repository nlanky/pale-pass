// LOCAL FILES
// Interfaces & Types
import type { Resources } from "features/resource/types";

export interface Building {
  name: string;
  resources: Resources; // How much of each resource we should improve gather rate by
  text: {
    join: string;
    leave: string;
  };
  image: string; // Path to image location
}
