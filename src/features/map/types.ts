// LOCAL FILES
// Interface & Types
import type { Resources } from "features/resource/types";

export interface MapTile {
  x: number;
  y: number;
  eventId: number | null;
  spyAmount: number;
  visible: boolean;
  explored: boolean;
  resources: Resources;
  isTown: boolean;
  isPlayerTown: boolean;
}
