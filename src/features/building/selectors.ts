// PUBLIC MODULES
import { createSelector } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
// Redux
import { selectTownTier } from "features/tier/selectors";
import {
  selectFunctionalTownBuildingIds,
  selectFunctionalTownVillagerIds,
  selectTownBuildingIdToBuilding,
  selectTownResources,
} from "features/town/selectors";
// Utility functions
import { canAffordResourceAmount } from "features/resource/utils";

export const selectBuildingModalId = (state: RootState) =>
  state.building.modalId;

export const selectModalBuilding = createSelector(
  [selectBuildingModalId],
  (modalId) => ID_TO_BUILDING[modalId || NaN],
);
export const selectModalTownBuilding = createSelector(
  [selectBuildingModalId, selectTownBuildingIdToBuilding],
  (modalId, buildingIdToBuilding) =>
    buildingIdToBuilding[modalId || NaN],
);
export const selectCanBuildModalBuilding = createSelector(
  [
    selectModalBuilding,
    selectTownTier,
    selectFunctionalTownBuildingIds,
    selectFunctionalTownVillagerIds,
    selectTownResources,
  ],
  (
    building,
    townTier,
    townBuildingIds,
    townVillagerIds,
    townResources,
  ) =>
    building &&
    townTier >= building.requirements.tier &&
    building.requirements.buildingIds.every((buildingId) =>
      townBuildingIds.includes(buildingId),
    ) &&
    building.requirements.villagerIds.every((villagerId) =>
      townVillagerIds.includes(villagerId),
    ) &&
    canAffordResourceAmount(townResources, building.buildResources),
);
export const selectCanRepairModalBuilding = createSelector(
  [selectModalBuilding, selectTownResources],
  (building, townResources) =>
    building &&
    canAffordResourceAmount(townResources, building.repairResources),
);
