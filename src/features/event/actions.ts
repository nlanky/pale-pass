// PUBLIC MODULES
import { createAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { Choice, Event, Outcome } from "features/event/types";

export const completeEvent = createAction<{
  event: Event;
  choice: Choice;
  outcome: Outcome;
}>("event/completeEvent");
export const triggerEvent = createAction<Event>("event/triggerEvent");
