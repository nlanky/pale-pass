// LOCAL FILES
// Interfaces & Types
import type { Event } from "features/event/types";

export const getRandomEvent = (events: Event[]): Event =>
  events[Math.floor(Math.random() * events.length)];
