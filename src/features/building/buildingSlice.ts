// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Redux
import { closeModal, openModal } from "features/building/actions";

interface BuildingState {
  modalId: number | null;
}

const initialState: BuildingState = {
  modalId: null,
};

export const buildingSlice = createSlice({
  name: "building",
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

export const buildingReducer = buildingSlice.reducer;
