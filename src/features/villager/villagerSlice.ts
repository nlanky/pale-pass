// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";

interface VillagerState {
  modalId: number | null;
}

const initialState: VillagerState = {
  modalId: null,
};

export const villagerSlice = createSlice({
  name: "villager",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.modalId = null;
    },
    openModal: (state, action: PayloadAction<number>) => {
      state.modalId = action.payload;
    },
  },
});

export const { closeModal, openModal } = villagerSlice.actions;

// Selectors
export const selectModalVillager = (state: RootState) =>
  ID_TO_VILLAGER[state.villager.modalId || NaN];
export const selectModalTownVillager = (state: RootState) =>
  state.town.player.villagers.find(
    (villager) => villager.id === state.villager.modalId,
  );

export const villagerReducer = villagerSlice.reducer;
