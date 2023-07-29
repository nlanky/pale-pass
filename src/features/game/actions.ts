// PUBLIC MODULES
import { createAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { View } from "features/game/types";

export const setView = createAction<View>("game/setView");
export const setDay = createAction<number>("game/setDay");
export const increaseGameSpeed = createAction(
  "game/increaseGameSpeed",
);
export const decreaseGameSpeed = createAction(
  "game/decreaseGameSpeed",
);
export const togglePause = createAction("game/togglePause");
