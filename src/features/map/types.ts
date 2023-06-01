// LOCAL FILES
// Interface & Types
import type { Resources } from "features/resource/types";

export interface MapTile {
  /** x coordinate in map, 0 indexed */
  x: number;
  /** y coordinate in map, 0 indexed */
  y: number;
  /** If tile triggers event, this is ID that should trigger */
  eventId: number | null;
  /** Number of spies required to explore tile */
  spyAmount: number;
  /** Whether tile is visible to player (player sees 1 tile around all explored tiles) */
  visible: boolean;
  /** Whether tile has been explored (i.e. clicked) */
  explored: boolean;
  /** Amount of each resource acquired for exploring tile */
  resources: Resources | null;
  /** If town tile, this is ID of town. Player town is ID 1. */
  townId: number | null;
}
