// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Redux
import type { RootState } from "features/redux/store";
import { triggerEvent } from "features/event/eventSlice";

interface BuildingState {
  openModal: number | null;
}

const initialState: BuildingState = {
  openModal: null,
};

export const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.openModal = null;
    },
    openModal: (state, action: PayloadAction<number>) => {
      state.openModal = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(triggerEvent, (state) => {
      state.openModal = null;
    });
  },
});

export const { closeModal, openModal } = buildingSlice.actions;

// Selectors
export const selectOpenBuildingModal = (state: RootState) =>
  state.building.openModal;

export const buildingReducer = buildingSlice.reducer;
