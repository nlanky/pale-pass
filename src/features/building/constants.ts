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
