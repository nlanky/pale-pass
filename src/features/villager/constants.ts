// LOCAL FILES
// Icons & Images
import { villagerIcon } from "assets/villager";
// Interfaces & Types
import type { Villager } from "features/villager/types";

export const ID_TO_VILLAGER: Record<number, Villager> = {
  32: {
    id: 32,
    name: "Jaakko",
    occupation: "Fool & Court Jester",
    description:
      "A man too fucking drunk to be of any use to the town. He may come out with a wise word every now and then though.",
    canRecruit: false,
    requirements: {
      tier: 1,
      buildingIds: [],
      villagerIds: [],
    },
    gatherResources: {
      Wood: -1,
      Stone: -1,
      Iron: 0,
      Steel: 0,
      Mythril: 0,
      Amethyst: 0,
    },
    recoveryTime: 8,
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
};
