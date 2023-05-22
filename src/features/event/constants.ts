// LOCAL FILES
// Constants
import { INITIAL_RESOURCES } from "features/resource/constants";
// Interfaces & Types
import type { Event } from "features/event/types";

export const TURNS_PER_EVENT = 12;
export const EVENT_PROBABILITY = 0.1; // Probability of an event triggering on a turn

// TODO: Remove test events
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
    introductionText:
      "In a matter of hours you have set up your tent, caught fish and stoked a small but merry fire in the middle of a beautiful clearing. This would make a fine start for a town, plentiful fish in the water, golden rye and wheat growing in the clearings nearby, strong pine trees reaching for the sky. What's more, there is a small outcropping of stone nearby that would be perfect for building - it might even contain some ores if your cursory survey proves correct! Full of flaky fish and content with your new outpost, you slip into sleep thinking about the future. On waking, splash your face with crystal clear water and turn your eyes on your camp. It seems you will need to manage several resources to grow - what would you like to focus on first?",
    choices: [
      {
        text: "I should focus on wood, we will need a steady supply for housing and cooking",
        outcomes: [],
      },
      {
        text: "I should focus on stone, we will need sturdy walls. Who knows what is in the forest?",
        outcomes: [],
      },
    ],
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
    introductionText: "",
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
    introductionText: "",
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
    introductionText: "",
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
    introductionText: "",
    choices: [],
  },
];
