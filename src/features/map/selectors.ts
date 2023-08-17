// LOCAL FILES
// Interfaces & Types
import type { RootState } from "features/redux/store";

export const selectMapTiles = (state: RootState) => state.map.tiles;
