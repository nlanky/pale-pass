// LOCAL FILES
// Constants
import { NO_RESOURCES } from "features/resource/constants";
// Icons & Images
import { buildingIcon } from "assets/building";
// Interfaces & Types
import type { Building } from "features/building/types";
// Utility functions
import { getResources } from "features/resource/utils";

/** Reference object for all buildings in the game */
export const ID_TO_BUILDING: Record<number, Building> = {
  9: {
    id: 9,
    name: "Blacksmith",
    description:
      "Proudly, you stand back in the cart track and look up at the smithy. It's a fine building and will help produce excellent tools to gather the resources hidden in this lush valley.",
    canBuild: false,
    requirements: {
      tier: 1,
      buildingIds: [],
      villagerIds: [],
    },
    gatherResources: getResources({ Wood: 1, Stone: 1 }),
    buildResources: getResources({ Wood: 10, Stone: 10 }),
    buildTime: 8,
    repairResources: getResources({ Wood: 5, Stone: 5 }),
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
    requirements: {
      tier: 1,
      buildingIds: [],
      villagerIds: [],
    },
    gatherResources: NO_RESOURCES,
    buildResources: getResources({ Wood: 10, Stone: 10 }),
    buildTime: 6,
    repairResources: getResources({ Wood: 5, Stone: 5 }),
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
