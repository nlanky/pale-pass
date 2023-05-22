// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { RootState } from "features/redux/store";
import type { Event, Outcome } from "features/event/types";

interface EventState {
  active: number | null; // ID of active event
  seen: number[]; // List of event IDs user has seen
}

const initialState: EventState = {
  active: null,
  seen: [],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    completeEvent: (
      state,
      action: PayloadAction<{
        eventId: number;
        chosenOutcome: Outcome;
      }>,
    ) => {
      console.log(`Event ${action.payload.eventId} completed`);
      state.active = null;
    },
    triggerEvent: (state, action: PayloadAction<Event>) => {
      const { id } = action.payload;
      state.active = id;
      state.seen = [...state.seen, id];
    },
  },
});

export const { completeEvent, triggerEvent } = eventSlice.actions;

// SELECTORS
export const selectSeenEvents = (state: RootState) =>
  state.event.seen;

export const eventReducer = eventSlice.reducer;
