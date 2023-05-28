// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Redux
import type { RootState } from "features/redux/store";
import { triggerEvent } from "features/event/eventSlice";

interface BuildingState {
  modalId: number | null;
}

const initialState: BuildingState = {
  modalId: null,
};

export const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.modalId = null;
    },
    openModal: (state, action: PayloadAction<number>) => {
      state.modalId = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(triggerEvent, (state) => {
      state.modalId = null;
    });
  },
});

export const { closeModal, openModal } = buildingSlice.actions;

// Selectors
export const selectModalBuildingId = (state: RootState) =>
  state.building.modalId;

export const buildingReducer = buildingSlice.reducer;
