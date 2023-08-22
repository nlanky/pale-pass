// LOCAL FILES
// Constants
import { NO_EVENT_REQUIREMENTS } from "features/event/constants";
// Interfaces & Types
import type { Event, EventRequirements } from "features/event/types";

export const getRandomEvent = (events: Event[]): Event =>
  events[Math.floor(Math.random() * events.length)];

/**
 * Simple function to create a full EventRequirements object from a partial definition.
 */
export const getEventRequirements = (
  requirements: Partial<EventRequirements>,
): EventRequirements =>
  Object.assign({ ...NO_EVENT_REQUIREMENTS }, requirements);
