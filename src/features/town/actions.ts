// PUBLIC MODULES
import { createAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { Resource } from "features/resource/types";

export const setTier = createAction<number>("town/setTier");
export const tradeResources = createAction<{
  fromResource: Resource;
  toResource: Resource;
  quantity: number;
}>("town/tradeResources");
export const buildBuilding = createAction<number>(
  "town/buildBuilding",
);
export const repairBuilding = createAction<number>(
  "town/repairBuilding",
);
export const recruitVillager = createAction<number>(
  "town/recruitVillager",
);
export const healVillager = createAction<number>("town/healVillager");
