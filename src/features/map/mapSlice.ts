// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { TILES } from "features/map/constants";
// Interfaces & Types
import type { Tile } from "features/map/types";
import type { RootState } from "features/redux/store";
// Redux
import { exploreTile } from "features/map/actions";

interface MapState {
  tiles: Tile[];
}

const initialState: MapState = {
  tiles: TILES,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(exploreTile, (state, action) => {
      const { x, y } = action.payload;
      const tileIndex = state.tiles.findIndex(
        (tile) => tile.x === x && tile.y === y,
      );

      // Set tile to explored
      state.tiles[tileIndex].explored = true;

      // Update visibility of adjacent tiles
      const tileUpIndex = state.tiles.findIndex(
        (tile) => tile.x === x && tile.y === y - 1,
      );
      if (tileUpIndex !== -1) {
        state.tiles[tileUpIndex].visible = true;
      }

      const tileRightIndex = state.tiles.findIndex(
        (tile) => tile.x === x + 1 && tile.y === y,
      );
      if (tileRightIndex !== -1) {
        state.tiles[tileRightIndex].visible = true;
      }

      const tileDownIndex = state.tiles.findIndex(
        (tile) => tile.x === x && tile.y === y + 1,
      );
      if (tileDownIndex !== -1) {
        state.tiles[tileDownIndex].visible = true;
      }

      const tileLeftIndex = state.tiles.findIndex(
        (tile) => tile.x === x - 1 && tile.y === y,
      );
      if (tileLeftIndex !== -1) {
        state.tiles[tileLeftIndex].visible = true;
      }
    });
  },
});

// Selectors
export const selectMapTiles = (state: RootState) => state.map.tiles;

export const mapReducer = mapSlice.reducer;
