// PUBLIC MODULES
import { createSelector } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
// Redux
import { selectTownTier } from "features/tier/selectors";
import {
  selectFunctionalTownBuildingIds,
  selectFunctionalTownVillagerIds,
  selectTownVillagerIdToVillager,
} from "features/town/selectors";

export const selectVillagerModalId = (state: RootState) =>
  state.villager.modalId;

export const selectModalVillager = createSelector(
  [selectVillagerModalId],
  (modalId) => ID_TO_VILLAGER[modalId || NaN],
);
export const selectModalTownVillager = createSelector(
  [selectVillagerModalId, selectTownVillagerIdToVillager],
  (modalId, villagerIdToVillager) =>
    villagerIdToVillager[modalId || NaN],
);
export const selectCanRecruitModalVillager = createSelector(
  [
    selectModalVillager,
    selectTownTier,
    selectFunctionalTownBuildingIds,
    selectFunctionalTownVillagerIds,
  ],
  (villager, townTier, townBuildingIds, townVillagerIds) =>
    villager &&
    townTier >= villager.requirements.tier &&
    villager.requirements.buildingIds.every((villagerId) =>
      townBuildingIds.includes(villagerId),
    ) &&
    villager.requirements.villagerIds.every((villagerId) =>
      townVillagerIds.includes(villagerId),
    ),
);
