// LOCAL FILES
// Constants
import { INITIAL_RESOURCES } from "features/resource/constants";
// Interfaces & Types
import type { Event } from "features/event/types";

export const TURNS_PER_EVENT = 12;
export const EVENT_PROBABILITY = 0.1; // Probability of an event triggering on a turn

// TODO: Populate with actual events
export const EVENTS: Event[] = [
  {
    id: 1,
    image: "",
    requirements: {
      tier: 1,
      resources: INITIAL_RESOURCES,
      buildings: [],
      villagers: [],
    },
    choices: [],
  },
  {
    id: 2,
    image: "",
    requirements: {
      tier: 1,
      resources: INITIAL_RESOURCES,
      buildings: [],
      villagers: [],
    },
    choices: [],
  },
  {
    id: 3,
    image: "",
    requirements: {
      tier: 1,
      resources: INITIAL_RESOURCES,
      buildings: [],
      villagers: [],
    },
    choices: [],
  },
  {
    id: 4,
    image: "",
    requirements: {
      tier: 1,
      resources: INITIAL_RESOURCES,
      buildings: [],
      villagers: [],
    },
    choices: [],
  },
  {
    id: 5,
    image: "",
    requirements: {
      tier: 1,
      resources: INITIAL_RESOURCES,
      buildings: [],
      villagers: [],
    },
    choices: [],
  },
];
