// LOCAL FILES
// Assets
import { event1Image } from "assets/events/index";
// Constants
import { NO_RESOURCES } from "features/resource/constants";
// Interfaces & Types
import type { Event } from "features/event/types";

export const TURNS_PER_EVENT = 12;
export const EVENT_PROBABILITY = 0.1; // Probability of an event triggering on a turn

export const EVENTS: Event[] = [
  {
    id: 1,
    image: event1Image,
    requirements: {
      tier: 1,
      resources: NO_RESOURCES,
      buildings: [],
      villagers: [],
    },
    introductionText:
      "In a matter of hours you have set up your tent, caught fish and stoked a small but merry fire in the middle of a beautiful clearing. This would make a fine start for a town, plentiful fish in the water, golden rye and wheat growing in the clearings nearby, strong pine trees reaching for the sky. What's more, there is a small outcropping of stone nearby that would be perfect for building - it might even contain some ores if your cursory survey proves correct! Full of flaky fish and content with your new outpost, you slip into sleep thinking about the future. On waking, splash your face with crystal clear water and turn your eyes on your camp. It seems you will need to manage several resources to grow - what would you like to focus on first?",
    choices: [
      {
        text: "I should focus on wood, we will need a steady supply for housing and cooking.",
        outcomes: [
          {
            text: "A good amount of wood for a day's work. This should help us build quickly.",
            resources: NO_RESOURCES,
            resourcesPerTurn: {
              Wood: 1,
              Stone: 0,
              Iron: 0,
              Steel: 0,
              Mythril: 0,
              Amethyst: 0,
            },
            building: null,
            villager: null,
            probability: 0.95,
          },
          {
            text: "A disaster! The tree you have carefully spent the day felling splits unexpectedly and falls into the river! A few branches snag on the shore but all you can do is watch the trunk float away and try again tomorrow.",
            resources: {
              Wood: 10,
              Stone: 0,
              Iron: 0,
              Steel: 0,
              Mythril: 0,
              Amethyst: 0,
            },
            resourcesPerTurn: NO_RESOURCES,
            building: null,
            villager: null,
            probability: 0.05,
          },
        ],
      },
      {
        text: "I should focus on stone, we will need sturdy walls. Who knows what is in the forest?",
        outcomes: [
          {
            text: "A sturdy block of granite stands proudly alongside the tent. We can cut this when needed quickly and easily.",
            resources: NO_RESOURCES,
            resourcesPerTurn: {
              Wood: 0,
              Stone: 1,
              Iron: 0,
              Steel: 0,
              Mythril: 0,
              Amethyst: 0,
            },
            building: null,
            villager: null,
            probability: 0.95,
          },
          {
            text: "A disaster! With the final blow of your pick the ground quakes and the block you have spent the day so carefully extracting crumbles into hundreds of useless chunks! Oh, well, at least you'll have plenty of loose stones for the firepits!",
            resources: {
              Wood: 0,
              Stone: 10,
              Iron: 0,
              Steel: 0,
              Mythril: 0,
              Amethyst: 0,
            },
            resourcesPerTurn: NO_RESOURCES,
            building: null,
            villager: null,
            probability: 0.05,
          },
        ],
      },
    ],
  },
];
