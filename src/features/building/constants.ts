// LOCAL FILES
// Constants
import { NO_RESOURCES } from "features/resource/constants";
// Interfaces & Types
import type { Building } from "features/building/types";

export const ID_TO_BUILDING: Record<number, Building> = {
  9: {
    id: 9,
    name: "Blacksmith",
    resources: { ...NO_RESOURCES, Wood: 1, Stone: 1 },
    text: {
      join: "Proudly, you stand back in the cart track and look up at the new smithy. It's a fine building and will help produce excellent tools to gather the resources hidden in this lush valley.",
      leave:
        "In the cold light of day you see just how much damage was done. This will take an age to rebuild. Well, better get started hauling the wood and stone to repair the building. It will be out of commission for some time.",
    },
    image: "",
  },
};
