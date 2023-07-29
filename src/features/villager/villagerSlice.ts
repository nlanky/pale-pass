// PUBLIC MODULES
import { createSelector, createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
import {
  selectFunctionalTownBuildingIds,
  selectFunctionalTownVillagerIds,
  selectTownTier,
  selectTownVillagerIdToVillager,
} from "features/town/townSlice";
// Redux
import { closeModal, openModal } from "features/villager/actions";

interface VillagerState {
  modalId: number | null;
}

const initialState: VillagerState = {
  modalId: null,
};

export const villagerSlice = createSlice({
  name: "villager",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(closeModal, (state) => {
        state.modalId = null;
      })
      .addCase(openModal, (state, action) => {
        state.modalId = action.payload;
      });
  },
});

// Selectors
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

export const villagerReducer = villagerSlice.reducer;
