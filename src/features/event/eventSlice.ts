// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { EVENTS } from "features/event/constants";
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
    // @ts-ignore Need to specify action type for other slices
    completeEvent: (state, action: PayloadAction<Outcome>) => {
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
export const selectActiveEvent = (state: RootState) =>
  EVENTS.find((event) => event.id === state.event.active);

export const eventReducer = eventSlice.reducer;
