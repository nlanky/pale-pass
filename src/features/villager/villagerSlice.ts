// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
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

export const villagerReducer = villagerSlice.reducer;
