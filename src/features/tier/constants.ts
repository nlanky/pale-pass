// LOCAL FILES
// Constants
import { NO_RESOURCES } from "features/resource/constants";
// Interfaces & Types
import type { Resource, Resources } from "features/resource/types";
import type { TierScreen } from "features/tier/types";
import type { TierRequirements } from "features/town/types";
// Utility functions
import { getResources } from "features/resource/utils";

export const TIER_TO_SCREENS: Record<number, TierScreen[]> = {
  1: [
    {
      text: "The King of Dunmoran, my father, summoned me and my numerous siblings to embark on a journey southward to Pale Pass. Our mission was to establish towns and colonies within the valley's embrace.",
      image: "",
    },
    {
      text: "Dunmoran's realm was confined by towering mountains and impassable ravines, save for the valley of Pale Pass, our gateway to the world.",
      image: "",
    },
    {
      text: "Clan Halfdun's ancestors had sought refuge in the small mountain tower, High Hammerand, fleeing an empire of beasts. Now, after two centuries of peace, King Harold's decree for expansion echoed.",
      image: "",
    },
    {
      text: "Our land was impoverished, plagued by scarce food and the need to mend our capital after every ruthless snowstorm. Armed with a pickaxe, a sword, and a tent, I ventured south. The task: transform Pale Pass into a new duchy, a source of sustenance for our people.",
      image: "",
    },
    {
      text: "Just as our settlement flourished, word arrived of our father's passing. The crown was up for grabs, with a condition - the first sibling to conquer the valley and return victorious would claim it.",
      image: "",
    },
  ],
  2: [
    {
      text: "Fueled by ambition, I set out to face my siblings, one by one, in a fierce contest for the throne.",
      image: "",
    },
    {
      text: "Our humble town transformed into a grand stronghold, bustling with allies and friends drawn by our success.",
      image: "",
    },
    {
      text: "The threat of my mightiest sibling loomed, their army casting a shadow over my newfound power. But through wits and strategy, I prevailed.",
      image: "",
    },
    {
      text: "Returning to Dunmoran triumphant, I was hailed as a hero. The crown adorned my head, marking my role as monarch of a vastly expanded realm.",
      image: "",
    },
    {
      text: "As monarch, I focused on uniting the region, bringing prosperity and security to our people.",
      image: "",
    },
  ],
  3: [
    {
      text: "The town of Pale Pass flourished, growing into a bustling hub of trade, culture, and community.",
      image: "",
    },
    {
      text: "Despite the challenges, I never forgot my origins in the small mountain tower, High Hammerand.",
      image: "",
    },
    {
      text: "I initiated expeditions to the cold mountain reaches, sending supplies and hope to the farthest corners of Dunmoran.",
      image: "",
    },
    {
      text: "My siblings and I found ourselves bound not only by blood but by our shared journey and aspirations.",
      image: "",
    },
    {
      text: "Bonds were forged among us, turning former rivals into staunch allies in the quest to strengthen our realm.",
      image: "",
    },
  ],
  4: [
    {
      text: "However, dark clouds loomed as rumors of unrest reached my ears, threatening the unity I had worked so hard to foster.",
      image: "",
    },
    {
      text: "Challenges mounted, as the scarce resources of Dunmoran strained to meet the growing demands of our expanding nation.",
      image: "",
    },
    {
      text: "A shadow from the past emerged when ancient writings hinted at the return of the empire of beasts that had driven our ancestors to the mountain tower.",
      image: "",
    },
    {
      text: "Fear gripped the land as we braced for an enemy not seen for two centuries, forcing me to balance expansion with defense.",
      image: "",
    },
    {
      text: "Battles ensued as I marshaled our forces to protect Dunmoran from the reawakened threat, evoking memories of our ancestors' struggle.",
      image: "",
    },
  ],
  5: [
    {
      text: "My strongest sibling, once my rival, stood by my side as we faced down the impending peril together.",
      image: "",
    },
    {
      text: "United, we confronted the beasts that had haunted our history, determined to preserve our realm at any cost.",
      image: "",
    },
    {
      text: "Victorious, we returned to a realm forever changed by our trials, our bond as siblings stronger than ever.",
      image: "",
    },
    {
      text: "The valley of Pale Pass stood as a testament to our resilience and unity, a thriving symbol of our shared victory.",
      image: "",
    },
    {
      text: "The scars of the past had shaped our destiny, but they also laid the foundation for a future of prosperity.",
      image: "",
    },
  ],
};

/**
 * Player must have the building and villagers in their town. They must
 * also pay a fixed amount of resources to advance.
 */
export const TIER_TO_REQUIREMENTS: Record<number, TierRequirements> =
  {
    1: {
      resources: NO_RESOURCES,
      buildingIds: [],
      villagerIds: [],
    },
    2: {
      resources: getResources({ Wood: -20, Stone: -20 }),
      buildingIds: [],
      villagerIds: [],
    },
    3: {
      resources: getResources({
        Wood: -20,
        Stone: -20,
        Iron: -20,
      }),
      buildingIds: [],
      villagerIds: [],
    },
    4: {
      resources: getResources({
        Wood: -20,
        Stone: -20,
        Iron: -20,
        Steel: -20,
      }),
      buildingIds: [],
      villagerIds: [],
    },
    5: {
      resources: getResources({
        Wood: -20,
        Stone: -20,
        Iron: -20,
        Mythril: -20,
      }),
      buildingIds: [],
      villagerIds: [],
    },
  };

/**
 * Start off with 2 resources and add 1 per tier.
 */
export const TIER_TO_ENABLED_RESOURCES: Record<number, Resource[]> = {
  1: ["Wood", "Stone"],
  2: ["Wood", "Stone", "Iron"],
  3: ["Wood", "Stone", "Iron", "Steel"],
  4: ["Wood", "Stone", "Iron", "Steel", "Mythril"],
  5: ["Wood", "Stone", "Iron", "Steel", "Mythril", "Amethyst"],
};

/**
 * Set resource values to INCREASE in each resource when advancing tiers.
 */
export const TIER_TO_RESOURCES_PER_DAY: Record<number, Resources> = {
  1: getResources({ Wood: 5, Stone: 5 }),
  2: getResources({ Wood: 5, Stone: 5, Iron: 5 }),
  3: getResources({ Wood: 5, Stone: 5, Iron: 5, Steel: 5 }),
  4: getResources({
    Wood: 5,
    Stone: 5,
    Iron: 5,
    Steel: 5,
    Mythril: 5,
  }),
  5: getResources({
    Wood: 5,
    Stone: 5,
    Iron: 5,
    Steel: 5,
    Mythril: 5,
    Amethyst: 5,
  }),
};
