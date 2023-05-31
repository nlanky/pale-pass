// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { MAP_TILES } from "features/map/constants";
// Interfaces & Types
import type { MapTile } from "features/map/types";
import type { RootState } from "features/redux/store";

interface MapState {
  tiles: MapTile[];
}

const initialState: MapState = {
  tiles: MAP_TILES,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
});

export const {} = mapSlice.actions;

// Selectors
export const selectMapTiles = (state: RootState) => state.map.tiles;

export const mapReducer = mapSlice.reducer;
