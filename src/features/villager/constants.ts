// LOCAL FILES
// Constants
import { NO_RESOURCES } from "features/resource/constants";
// Icons & Images
import { villagerIcon } from "assets/villager";
// Interfaces & Types
import type {
  Villager,
  VillagerRequirements,
} from "features/villager/types";
// Utility functions
import { getResources } from "features/resource/utils";
import { getVillagerRequirements } from "features/villager/utils";

export const NO_VILLAGER_REQUIREMENTS: VillagerRequirements = {
  tier: 1,
  buildingIds: [],
  villagerIds: [],
};

export const ID_TO_VILLAGER: Record<number, Villager> = {
  1: {
    id: 1,
    name: "Tom",
    occupation: "Wizard",
    description: "",
    specialty: "Soldier",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: getResources({ Amethyst: 1 }),
    militaryStrength: {
      handToHand: 2,
      archery: 5,
      mounted: 5,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  2: {
    id: 2,
    name: "Kobus",
    occupation: "Gargoyle",
    description: "",
    specialty: "Spy",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: getResources({ Stone: 1 }),
    militaryStrength: {
      handToHand: 2,
      archery: 1,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  3: {
    id: 3,
    name: "Neil",
    occupation: "Arcane Architect",
    description: "",
    specialty: "Builder",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: getResources({ Mythril: 1 }),
    militaryStrength: {
      handToHand: 1,
      archery: 2,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  4: {
    id: 4,
    name: "Spirit",
    occupation: "Thoughtsmith",
    description: "",
    specialty: "Healer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: getResources({ Amethyst: 1 }),
    militaryStrength: {
      handToHand: 3,
      archery: 1,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  5: {
    id: 5,
    name: "Alex",
    occupation: "Quartermaster",
    description: "First among equals.",
    specialty: "Spy",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: getResources({ Stone: 1 }),
    militaryStrength: {
      handToHand: 2,
      archery: 1,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  6: {
    id: 6,
    name: "Angie",
    occupation: "Bard",
    description: "",
    specialty: "Spy",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: getResources({ Wood: -1, Iron: 1 }),
    militaryStrength: {
      handToHand: 1,
      archery: 1,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  7: {
    id: 7,
    name: "Malivil",
    occupation: "Maladin",
    description: "",
    specialty: "Healer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: getResources({ Iron: -1, Steel: 1 }),
    militaryStrength: {
      handToHand: 1,
      archery: 3,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  8: {
    id: 8,
    name: "Technofrood",
    occupation: "Machinator",
    description: "",
    specialty: "Soldier",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 4,
      archery: 3,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  9: {
    id: 9,
    name: "Jason",
    occupation: "Smallholder",
    description: "",
    specialty: "Scout",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 1,
      archery: 3,
      mounted: 4,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  10: {
    id: 10,
    name: "Alistair",
    occupation: "Chorister",
    description: "",
    specialty: "Healer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 1,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  11: {
    id: 11,
    name: "Alex",
    occupation: "Swede",
    description: "",
    specialty: "Healer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 1,
      archery: 3,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  12: {
    id: 12,
    name: "Bruce",
    occupation: "Siege Engineer",
    description: "Dildo merchant and sex pest.",
    specialty: "Soldier",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 5,
      mounted: 5,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  13: {
    id: 13,
    name: "Dan",
    occupation: "Forester",
    description: "",
    specialty: "Scout",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 2,
      archery: 5,
      mounted: 3,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  14: {
    id: 14,
    name: "Jordy",
    occupation: "Trickster",
    description: "",
    specialty: "Spy",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 2,
      archery: 2,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  15: {
    id: 15,
    name: "Putzly",
    occupation: "Miner",
    description: "",
    specialty: "Gatherer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 1,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  16: {
    id: 16,
    name: "Shorts",
    occupation: "GIFsmith",
    description: "Makes GIFs, fucks grannies. Refuses to elaborate.",
    specialty: "Spy",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 3,
      mounted: 3,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  17: {
    id: 17,
    name: "Spaaz",
    occupation: "Baker",
    description: "",
    specialty: "Gatherer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 2,
      archery: 2,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  18: {
    id: 18,
    name: "Umbra",
    occupation: "Necromancer",
    description: "What if Malivil was bad?",
    specialty: "Healer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 1,
      archery: 4,
      mounted: 3,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  19: {
    id: 19,
    name: "Vodrix",
    occupation: "Blacksmith",
    description: "",
    specialty: "Soldier",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 5,
      archery: 3,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  20: {
    id: 20,
    name: "Vilidoug",
    occupation: "Metalurgist",
    description: "",
    specialty: "Gatherer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 4,
      archery: 2,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  21: {
    id: 21,
    name: "Woodysus",
    occupation: "Joiner",
    description: "",
    specialty: "Gatherer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 2,
      archery: 4,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  22: {
    id: 22,
    name: "Zoarino",
    occupation: "Archeologist",
    description: "",
    specialty: "Scout",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 4,
      mounted: 4,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  23: {
    id: 23,
    name: "Carl",
    occupation: "Carpenter",
    description: "",
    specialty: "Builder",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 3,
      mounted: 3,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  24: {
    id: 24,
    name: "Aartvark",
    occupation: "Painter",
    description: "",
    specialty: "Gatherer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 2,
      archery: 3,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  25: {
    id: 25,
    name: "Dapper",
    occupation: "Tax Collector",
    description: "",
    specialty: "Spy",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 2,
      archery: 4,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  26: {
    id: 26,
    name: "Whitesage",
    occupation: "Chef",
    description: "",
    specialty: "Gatherer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 2,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  27: {
    id: 27,
    name: "Ash",
    occupation: "Whitesmith",
    description: "",
    specialty: "Gatherer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 3,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  28: {
    id: 28,
    name: "Brady",
    occupation: "Mason",
    description: "",
    specialty: "Builder",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 3,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  29: {
    id: 29,
    name: "Dingy",
    occupation: "Ranger",
    description: "",
    specialty: "Scout",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 2,
      archery: 4,
      mounted: 3,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  30: {
    id: 30,
    name: "Ellen",
    occupation: "Bowyer",
    description: "",
    specialty: "Soldier",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 5,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  31: {
    id: 31,
    name: "Jaakko",
    occupation: "Fool & Court Jester",
    description:
      "A man too fucking drunk to be of any use to the town. He may come out with a wise word every now and then though.",
    specialty: "Scout",
    canRecruit: false,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: getResources({ Wood: -1, Stone: -1 }),
    militaryStrength: {
      handToHand: 1,
      archery: 1,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  32: {
    id: 32,
    name: "Gianni",
    occupation: "Hunter",
    description: "",
    specialty: "Scout",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 1,
      archery: 2,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  33: {
    id: 33,
    name: "Jar",
    occupation: "Alchemist",
    description: "",
    specialty: "Healer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 1,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  34: {
    id: 34,
    name: "Crimmy",
    occupation: "Warrior",
    description: "",
    specialty: "Soldier",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 1,
      archery: 2,
      mounted: 4,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  35: {
    id: 35,
    name: "Lexie",
    occupation: "Artist",
    description: "",
    specialty: "Scout",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 2,
      archery: 1,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  36: {
    id: 36,
    name: "Lou",
    occupation: "Librarian",
    description: "",
    specialty: "Healer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 1,
      archery: 1,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  37: {
    id: 37,
    name: "Ricardo",
    occupation: "Armourer",
    description: "",
    specialty: "Builder",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 1,
      mounted: 3,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  38: {
    id: 38,
    name: "Siggy",
    occupation: "Hooper",
    description: "",
    specialty: "Gatherer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 2,
      archery: 2,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  39: {
    id: 39,
    name: "Sky",
    occupation: "Roofer",
    description: "",
    specialty: "Builder",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 1,
      archery: 1,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  40: {
    id: 40,
    name: "Bulba",
    occupation: "Trainer",
    description: "",
    specialty: "Soldier",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 3,
      mounted: 3,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  41: {
    id: 41,
    name: "Sean",
    occupation: "Translator",
    description: "",
    specialty: "Spy",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 1,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  42: {
    id: 42,
    name: "Tensa",
    occupation: "Builder",
    description: "",
    specialty: "Builder",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 2,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  43: {
    id: 43,
    name: "Stig",
    occupation: "LUAnist",
    description: "",
    specialty: "Builder",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 2,
      archery: 2,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  44: {
    id: 44,
    name: "Tiger",
    occupation: "Rancher",
    description: "",
    specialty: "Healer",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 1,
      mounted: 5,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  45: {
    id: 45,
    name: "TJ",
    occupation: "Sea Captain",
    description:
      "A hardened salty sea dog, unwilling to even say please and thank you to an old lady.",
    specialty: "Soldier",
    canRecruit: false,
    requirements: getVillagerRequirements({ tier: 5 }),
    gatherResources: getResources({
      Wood: -1,
      Stone: -1,
      Iron: -1,
      Steel: -1,
      Mythril: -1,
      Amethyst: -1,
    }),
    militaryStrength: {
      handToHand: 5,
      archery: 5,
      mounted: 5,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  46: {
    id: 46,
    name: "Sandpiper",
    occupation: "Knife Bird",
    description:
      "A malevolent overlord of the pass, that seems strangely to look kindly upon your little town.",
    specialty: "Soldier",
    canRecruit: false,
    requirements: getVillagerRequirements({ tier: 5 }),
    gatherResources: getResources({
      Wood: -1,
      Stone: -1,
      Iron: -1,
      Steel: -1,
      Mythril: -1,
      Amethyst: -1,
    }),
    militaryStrength: {
      handToHand: 5,
      archery: 5,
      mounted: 5,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  47: {
    id: 47,
    name: "Nick",
    occupation: "Bushwhacker",
    description: "",
    specialty: "Scout",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 3,
      archery: 4,
      mounted: 1,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  48: {
    id: 48,
    name: "Dom",
    occupation: "Actual Spy",
    description: "",
    specialty: "Spy",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 2,
      archery: 2,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
  49: {
    id: 49,
    name: "Pardzival",
    occupation: "Politician",
    description: "",
    specialty: "Spy",
    canRecruit: true,
    requirements: NO_VILLAGER_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    militaryStrength: {
      handToHand: 1,
      archery: 2,
      mounted: 2,
    },
    icons: {
      healthy: villagerIcon,
      recovering: villagerIcon,
      injured: villagerIcon,
      dead: villagerIcon,
    },
  },
};
