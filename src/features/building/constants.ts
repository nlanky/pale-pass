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
  9: {
    id: 9,
    name: "Blacksmith",
    description:
      "Proudly, you stand back in the cart track and look up at the smithy. It's a fine building and will help produce excellent tools to gather the resources hidden in this lush valley.",
    canBuild: false,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: getResources({ Wood: 1, Stone: 1 }),
    buildResources: getResources({ Wood: -10, Stone: -10 }),
    buildTime: 8,
    repairResources: getResources({ Wood: -5, Stone: -5 }),
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
