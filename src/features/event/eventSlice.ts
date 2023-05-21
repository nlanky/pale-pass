// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { RootState } from "features/redux/store";
import type { Event, Outcome } from "features/event/types";

interface EventState {
  seen: number[]; // List of event IDs user has seen
}

const initialState: EventState = {
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
      // TODO: Logging?
    },
    triggerEvent: (state, action: PayloadAction<Event>) => {
      state.seen = [...state.seen, action.payload.id];
    },
  },
});

export const { completeEvent, triggerEvent } = eventSlice.actions;

// SELECTORS
export const selectSeenEvents = (state: RootState) =>
  state.event.seen;

export const eventReducer = eventSlice.reducer;
