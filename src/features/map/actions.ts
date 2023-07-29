// PUBLIC MODULES
import { createAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { Tile } from "features/map/types";

export const exploreTile = createAction<Tile>("map/exploreTile");
