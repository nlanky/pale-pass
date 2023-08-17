// LOCAL FILES
// Assets
import { event1Image, event2Image } from "assets/event";
// Constants
import { NO_RESOURCES } from "features/resource/constants";
// Interfaces & Types
import type { Event, EventRequirements } from "features/event/types";
// Utility functions
import { getResources } from "features/resource/utils";

export const DAYS_PER_EVENT = 12;
export const EVENT_PROBABILITY = 0.1; // Probability of an event triggering on a day
export const NO_EVENT_REQUIREMENTS: EventRequirements = {
  tier: 1,
  resources: NO_RESOURCES,
  buildingIds: [],
  villagerIds: [],
};

export const EVENT_ID_TO_EVENT: Record<number, Event> = {
  1: {
    id: 1,
    image: event1Image,
    requirements: NO_EVENT_REQUIREMENTS,
    introductionText:
      "In a matter of hours you have set up your tent, caught fish and stoked a small but merry fire in the middle of a beautiful clearing. This would make a fine start for a town, plentiful fish in the water, golden rye and wheat growing in the clearings nearby, strong pine trees reaching for the sky. What's more, there is a small outcropping of stone nearby that would be perfect for building - it might even contain some ores if your cursory survey proves correct! Full of flaky fish and content with your new outpost, you slip into sleep thinking about the future. On waking, you splash your face with crystal clear water and turn your eyes on your camp. It seems you will need to manage several resources to grow - what would you like to focus on first?",
    choices: [
      {
        text: "I should focus on wood, we will need a steady supply for housing and cooking.",
        outcomes: [
          {
            text: "A good amount of wood for a day's work. This should help us build quickly.",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({ Wood: 1 }),
            buildings: [],
            villagers: [],
            probability: 0.95,
          },
          {
            text: "A disaster! The tree you have carefully spent the day felling splits unexpectedly and falls into the river! A few branches snag on the shore but all you can do is watch the trunk float away and try again tomorrow.",
            resources: getResources({ Wood: 10 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
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
            resourcesPerDay: getResources({ Stone: 1 }),
            buildings: [],
            villagers: [],
            probability: 0.95,
          },
          {
            text: "A disaster! With the final blow of your pick the ground quakes and the block you have spent the day so carefully extracting crumbles into hundreds of useless chunks! Oh, well, at least you'll have plenty of loose stones for the firepits!",
            resources: getResources({ Stone: 10 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
            probability: 0.05,
          },
        ],
      },
    ],
  },
  2: {
    id: 2,
    image: event2Image,
    requirements: {
      tier: 1,
      buildingIds: [],
      villagerIds: [5],
      resources: NO_RESOURCES,
    },
    introductionText:
      "As you make your way through a dense forest, you stumble upon a small hole in the ground. Upon closer inspection, you notice a pair of eyes peering back at you from inside the hole. You manage to translate the slurred, broken English and copious amounts of swearing in the individual's speech to learn that this is Jaakko, a Finnish man hiding from the quartermaster.\n\nHe tells you that he was falsely accused of a crime and doesn't want to return to the town out of fear that he will be reprimanded.\n\nDespite his drunken state and rough exterior, Jaakko is knowledgeable about the local area and offers the limited resources he has gathered in exchange for a place to stay in your town. His drinking and unpredictable behaviour could prove to be a liability though, not to mention the potential for the quartermaster to find out about your actions. What do you do?",
    choices: [
      {
        text: "Offer Jaakko a hideout in the town",
        outcomes: [
          {
            text: "Jaakko is relieved to hear your offer and swiftly exits the hole, carrying with him resources in a hemp sack.",
            resources: getResources({ Wood: 10, Stone: 10 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 31, state: "healthy" }],
            probability: 0.5,
          },
          {
            text: 'Jaakko accompanies you back to the town, telling numerous stories of his prowess. Upon questioning him about the resources promised, he shrugs and mutters "beta cuck" under his breath.',
            resources: NO_RESOURCES,
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 31, state: "healthy" }],
            probability: 0.5,
          },
        ],
      },
      {
        text: "Return to the town and notify the quartermaster about where Jaakko is hiding",
        outcomes: [
          {
            text: "The quartermaster grants you some spare resources in exchange for the information. Later that day, you see Jaakko's lifeless corpse being wheeled back into town on the back of a wagon. It appears negotiations were short.",
            resources: getResources({ Wood: 10, Stone: 10 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 31, state: "dead" }],
            probability: 0.5,
          },
          {
            text: 'While returning to your abode in the evening, you hear a rustle in a bush nearby. Unperturbed, you put the noise down to the local wildlife. However, just as you go to open your front door, you could have sworn you heard the words "dumb cunt" muttered from the same bush. Did Jaakko survive his encounter with the quartermaster?',
            resources: NO_RESOURCES,
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 31, state: "injured" }],
            probability: 0.5,
          },
        ],
      },
    ],
  },
  11: {
    id: 11,
    image: event1Image,
    requirements: {
      tier: 1,
      resources: getResources({ Wood: 10, Stone: 10 }),
      buildingIds: [],
      villagerIds: [],
    },
    introductionText:
      "With the main features of the camp up and running, you turn your attention to the mountains surrounding your little valley. If you had the proper tools you could really speed up your ability to exact resources. Perhaps it's time for a smithy? Albeit a simple one!",
    choices: [
      {
        text: "If I focus on building up the forge first I can make life much easier!",
        outcomes: [
          {
            text: "With a few hours work and a mighty amount of sweat you have put together a forge! It's basic but quick to warm, and will produce simple tools to help you mine and forest.",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({ Stone: 1 }),
            buildings: [{ id: 19, state: "built" }],
            villagers: [],
            probability: 0.9,
          },
          {
            text: "With a curse you kick another rock away from the limp pile in front of you! Damn it all, this is useless and the forge going to use far more wood than it should to stay hot!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({
              Wood: -1,
              Stone: -1,
            }),
            buildings: [{ id: 19, state: "built" }],
            villagers: [],
            probability: 0.1,
          },
        ],
      },
      {
        text: "A sturdy foundation and walls are what is needed for a proper smithy - let's not rush to the end and fall over our feet!",
        outcomes: [
          {
            text: "With a few hours work and a mighty amount of sweat you stand upon a fresh laid floor of pine planks, surrounded by sturdy wooden and stone walls. A merry little forge stands in the corner, ready to help you assemble the first tools you will need!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({ Stone: 1 }),
            buildings: [{ id: 19, state: "built" }],
            villagers: [],
            probability: 0.9,
          },
          {
            text: "The sun falls behind the mountains and in the growing dark your ramshackle building sheds it's only remaining wall. How did it all go so wrong? The entire structure is lopsided and will need constant repairs in order to stay standing! At least the forge is functional, barely!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({
              Wood: -1,
              Stone: -1,
            }),
            buildings: [{ id: 19, state: "built" }],
            villagers: [],
            probability: 0.1,
          },
        ],
      },
    ],
  },
  32: {
    id: 32,
    image: event1Image,
    requirements: {
      tier: 2,
      resources: getResources({ Wood: 30, Stone: 30, Iron: 30 }),
      buildingIds: [19],
      villagerIds: [],
    },
    introductionText:
      "You wake with a start to the smell of smoke and the braying of your trusted donkey. Rosy light shines on your cieling and you quickly realise - fire! You run outside and see the blacksmith is up in flames!",
    choices: [
      {
        text: "Run for the building! We must save the tools!",
        outcomes: [
          {
            text: "With speed you didn't know you were capable of, you sprint to the blacksmiths and cover your mouth before diving into the haze. You start to throw the tools out of the window as quickly as possible!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({
              Wood: -1,
              Stone: -1,
            }),
            buildings: [{ id: 19, state: "destroyed" }],
            villagers: [],
            probability: 0.5,
          },
          {
            text: "You jog as quickly as your sleepy legs will carry you over to the blacksmiths. Running inside you spend most of your time choking on the smoke and manage to save very few of the tools!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({
              Wood: -1,
              Stone: -1,
            }),
            buildings: [{ id: 19, state: "destroyed" }],
            villagers: [],
            probability: 0.5,
          },
        ],
      },
      {
        text: "Run for the river! We need water now!",
        outcomes: [
          {
            text: "Bucket in hand you splash into the water, startling the dozing fish sleeping under the bank. Several such trips between the river and the blacksmiths manage to save the majority of the building! Although repairs will still be needed for some time!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({
              Wood: -1,
              Stone: -1,
            }),
            buildings: [{ id: 19, state: "destroyed" }],
            villagers: [],
            probability: 0.5,
          },
          {
            text: "Bucket in hand you splash into the river, startling the sleeping fish! A particularly large sturgeon lashes your leg as you stand in the icy water and you fall flat on your face in shock! The water knocks the air from your lungs, and it's a spluttering, wet, mess of a person who eventually puts out the fire in the blacksmiths. It will take some time before it is repaired!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({ Wood: -1, Stone: -1 }),
            buildings: [{ id: 19, state: "destroyed" }],
            villagers: [],
            probability: 0.5,
          },
        ],
      },
    ],
  },
};
