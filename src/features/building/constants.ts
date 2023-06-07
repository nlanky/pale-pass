// LOCAL FILES
// Constants
import { NO_RESOURCES } from "features/resource/constants";
// Icons & Images
import { buildingIcon } from "assets/building";
// Interfaces & Types
import type {
  Building,
  BuildingRequirements,
} from "features/building/types";
// Utility functions
import { getResources } from "features/resource/utils";

export const NO_BUILDING_REQUIREMENTS: BuildingRequirements = {
  tier: 1,
  buildingIds: [],
  villagerIds: [],
};

/** Reference object for all buildings in the game */
export const ID_TO_BUILDING: Record<number, Building> = {
  1: {
    id: 1,
    name: "Small Cottages",
    description:
      "New faces are joinng the village almost every day now. It's time people had a proper place to live! A row of small cottages can be put together quickly if we all work together. A few days of labour and you stand before small, but cosy and warm cottages. Much better than the tents and shelters people were using! People are sure to work harder with a good roof over their heads.",
    canBuild: true,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: getResources({ Wood: 1 }),
    buildResources: getResources({ Wood: -50, Stone: -50 }),
    buildTime: 14,
    repairResources: getResources({ Wood: -25, Stone: -25 }),
    repairTime: 7,
    icons: {
      built: buildingIcon,
      "under construction": buildingIcon,
      "being repaired": buildingIcon,
      damaged: buildingIcon,
      destroyed: buildingIcon,
    },
  },
  2: {
    id: 2,
    name: "Houses",
    description:
      "Well! A few weeks of planning and storing up some spare resources has flown by and now you can proudly welcome families from those cramped cottages and offer them a house worth being proud off. They seem overjoyed and plans for decorating quickly overtake the conversations at dinner!",
    canBuild: true,
    requirements: { tier: 2, buildingIds: [1], villagerIds: [] },
    gatherResources: getResources({ Wood: 1, Stone: 1 }),
    buildResources: getResources({ Wood: -100, Stone: -130 }),
    buildTime: 26,
    repairResources: getResources({ Wood: -50, Stone: -75 }),
    repairTime: 15,
    icons: {
      built: buildingIcon,
      "under construction": buildingIcon,
      "being repaired": buildingIcon,
      damaged: buildingIcon,
      destroyed: buildingIcon,
    },
  },
  5: {
    id: 5,
    name: "Manor House",
    description:
      "Providing for the people of the town worked extremely well in terms of housing. The only problem is you also need a suitable home! A few stern words with a passing foreman and plans are quickly arranged. A matter of days and a swarm of helpful and grateful townspeople are putting together the finishing touches on your new Manor, as befits your station. Lovely!",
    canBuild: true,
    requirements: { tier: 3, buildingIds: [2], villagerIds: [] },
    gatherResources: getResources({ Wood: -1, Stone: -1, Iron: 1 }),
    buildResources: getResources({
      Wood: -300,
      Stone: -300,
      Iron: -100,
      Steel: -50,
    }),
    buildTime: 40,
    repairResources: getResources({
      Wood: -150,
      Stone: -150,
      Iron: -50,
      Steel: -25,
    }),
    repairTime: 20,
    icons: {
      built: buildingIcon,
      "under construction": buildingIcon,
      "being repaired": buildingIcon,
      damaged: buildingIcon,
      destroyed: buildingIcon,
    },
  },
  7: {
    id: 7,
    name: "Knight's Motte & Bailey",
    description:
      "If war is to come to the valley and your siblings are to be brought to heel then we must be able to defend ourselves. A true motte and bailey is quickly erected on your orders, rising over the highest hill in the town and displaying to all your martial might! ",
    canBuild: true,
    requirements: { tier: 4, buildingIds: [5], villagerIds: [] },
    gatherResources: getResources({ Stone: -1, Iron: -1, Steel: 1 }),
    buildResources: getResources({
      Wood: -500,
      Stone: -500,
      Iron: -300,
      Steel: -200,
    }),
    buildTime: 50,
    repairResources: getResources({
      Wood: -250,
      Stone: -250,
      Iron: -150,
      Steel: -100,
    }),
    repairTime: 25,
    icons: {
      built: buildingIcon,
      "under construction": buildingIcon,
      "being repaired": buildingIcon,
      damaged: buildingIcon,
      destroyed: buildingIcon,
    },
  },
  9: {
    id: 9,
    name: "Blacksmith",
    description:
      "Proudly, you stand back in the cart track and look up at the smithy. It's a fine building and will help produce excellent tools to gather the resources hidden in this lush valley.",
    canBuild: false,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: getResources({ Wood: 1, Stone: 1 }),
    buildResources: getResources({ Wood: -80, Stone: -90 }),
    buildTime: 25,
    repairResources: getResources({ Wood: -40, Stone: -45 }),
    repairTime: 15,
    icons: {
      built: buildingIcon,
      "under construction": buildingIcon,
      "being repaired": buildingIcon,
      damaged: buildingIcon,
      destroyed: buildingIcon,
    },
  },
  10: {
    id: 10,
    name: "Woodcutter",
    description:
      "The smell of fresh pine sap and drying racks of wood fills the air. With a smile and a huge noseful of the pleasant scent you check on the work of the Woodcutter. Quickly realising much more has been done than you thought you are presented with a large and industrious wood cutting shop - full of the tools and space needed to efficiently increase production in your burgeoning town!",
    canBuild: true,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: getResources({ Wood: 1 }),
    buildResources: getResources({ Wood: -100, Stone: -100 }),
    buildTime: 10,
    repairResources: getResources({ Wood: -50, Stone: -50 }),
    repairTime: 5,
    icons: {
      built: buildingIcon,
      "under construction": buildingIcon,
      "being repaired": buildingIcon,
      damaged: buildingIcon,
      destroyed: buildingIcon,
    },
  },
  11: {
    id: 11,
    name: "Mill",
    description:
      "Food is becoming an issue in the town. Enough is grown but the speed of processing leaves much to be desired, and leaves much rotting in the fields! If you could make the food last longer it would be much easier to steady the food supply. Nothing for it but to order a Mill built so we can properly process the crops. No more than a week later you hear the creak and crack of the great sails of the Mill turning for the first time in the wind. Excellent! On to the next crisis!",
    canBuild: true,
    requirements: { tier: 2, buildingIds: [17], villagerIds: [] },
    gatherResources: getResources({ Wood: 1, Stone: 1, Iron: 1 }),
    buildResources: getResources({
      Wood: -150,
      Stone: -250,
      Iron: -35,
    }),
    buildTime: 20,
    repairResources: getResources({
      Wood: -75,
      Stone: -125,
      Iron: -15,
    }),
    repairTime: 10,
    icons: {
      built: buildingIcon,
      "under construction": buildingIcon,
      "being repaired": buildingIcon,
      damaged: buildingIcon,
      destroyed: buildingIcon,
    },
  },
  12: {
    id: 12,
    name: "Charcoal Maker",
    description:
      "A bang on the door rouses you from a peaceful slumber by the fire. Groggily you answer and are accosted by the smith! 'M'lord, it's no bloody good! We need better fuel if we're to keep up production - we're just going through too much wood!' Before a response can rise to your lips the smith is gone, returned to the wind and the night as quickly as they arrived. Right-o, then! I've seen smoke over the trees near the far fields, tomorrow a guard is being sent to recruit those bloody charcoal makers and have them send their goods to town. Maybe then people around here will be able to sleep in peace!",
    canBuild: true,
    requirements: { tier: 2, buildingIds: [9], villagerIds: [] },
    gatherResources: getResources({ Wood: 1 }),
    buildResources: getResources({
      Wood: -50,
      Stone: -20,
      Iron: -5,
    }),
    buildTime: 5,
    repairResources: getResources({
      Wood: -25,
      Stone: -10,
      Iron: -3,
    }),
    repairTime: 2,
    icons: {
      built: buildingIcon,
      "under construction": buildingIcon,
      "being repaired": buildingIcon,
      damaged: buildingIcon,
      destroyed: buildingIcon,
    },
  },
  13: {
    id: 13,
    name: "Fishery",
    description:
      "Gods! What a day in the village! The sun is high in the sky, and the waters are crystal clear in the river. Abundance surrounds you, and you notice for the first time that the number of fat slow fish in the river has increased steadily in your time here. Thoughts of fried fish on your mind you have a word with one of the lads nearby and send them running to fetch the builders. A proper fishery will help us take advantage of the blessings the gods of water have sent. And think of all the delicious fish!",
    canBuild: true,
    requirements: { tier: 2, buildingIds: [], villagerIds: [] },
    gatherResources: getResources({ Wood: 1, Stone: 1, Iron: 1 }),
    buildResources: getResources({
      Wood: -100,
      Stone: -50,
      Iron: -50,
    }),
    buildTime: 13,
    repairResources: getResources({
      Wood: -50,
      Stone: -25,
      Iron: -25,
    }),
    repairTime: 7,
    icons: {
      built: buildingIcon,
      "under construction": buildingIcon,
      "being repaired": buildingIcon,
      damaged: buildingIcon,
      destroyed: buildingIcon,
    },
  },
  14: {
    id: 14,
    name: "Bakery",
    description:
      "Walking home after a day of gathering resources you are led by your nose down a path you normally would not take. A scintilating smell pulls you along until you stop at a pie and a loaf of spiced bread cooling on a window sill. You are just about to take a bite of fruit pie when a firm smack with a rolling pin brings you to your senses. 'You listen here, king or not, you ask when you want a slice of my pie! If you want I'd be happy to make you your own, I'll make as many as the town needs but manners cost nothing!' Utterly ashamed and now utterly starving you rush to order a bakery put together for this fine woman so she can supply her treats to the whole town.",
    canBuild: true,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: getResources({ Wood: 1, Stone: 1 }),
    buildResources: getResources({
      Wood: -60,
      Stone: -40,
    }),
    buildTime: 8,
    repairResources: getResources({
      Wood: -30,
      Stone: -20,
    }),
    repairTime: 4,
    icons: {
      built: buildingIcon,
      "under construction": buildingIcon,
      "being repaired": buildingIcon,
      damaged: buildingIcon,
      destroyed: buildingIcon,
    },
  },
  152: {
    id: 152,
    name: "Market Stall",
    description:
      "With the market stall, you can buy and sell resources.",
    canBuild: true,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    buildResources: getResources({ Wood: -10, Stone: -10 }),
    buildTime: 6,
    repairResources: getResources({ Wood: -5, Stone: -5 }),
    repairTime: 3,
    icons: {
      built: buildingIcon,
      "under construction": buildingIcon,
      "being repaired": buildingIcon,
      damaged: buildingIcon,
      destroyed: buildingIcon,
    },
  },
};
