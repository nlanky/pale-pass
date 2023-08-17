// PUBLIC MODULES
import { createSelector } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { EVENT_ID_TO_EVENT } from "features/event/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";

export const selectActiveEventId = (state: RootState) =>
  state.event.activeId;

export const selectActiveEvent = createSelector(
  [selectActiveEventId],
  (eventId) => EVENT_ID_TO_EVENT[eventId || NaN],
);
