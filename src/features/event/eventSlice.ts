// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Redux
import { completeEvent, triggerEvent } from "features/event/actions";
import { exploreTile } from "features/map/actions";

interface EventState {
  activeId: number | null; // ID of active event
}

const initialState: EventState = {
  activeId: null,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(completeEvent, (state) => {
        state.activeId = null;
      })
      .addCase(triggerEvent, (state, action) => {
        state.activeId = action.payload;
      })
      .addCase(exploreTile, (state, action) => {
        const eventId = action.payload.eventId;
        if (eventId) {
          state.activeId = eventId;
        }
      });
  },
});

export const eventReducer = eventSlice.reducer;
