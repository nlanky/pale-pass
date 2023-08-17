// PUBLIC MODULES
import { createAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { CompletedEvent } from "features/event/types";

export const completeEvent = createAction<CompletedEvent>(
  "event/completeEvent",
);
export const triggerEvent = createAction<number>(
  "event/triggerEvent",
);
