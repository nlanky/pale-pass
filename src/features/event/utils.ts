// LOCAL FILES
// Constants
import { EVENTS } from "features/event/constants";
// Interfaces & Types
import type { Event } from "features/event/types";
import type { Town } from "features/town/types";

export const getValidEvent = (
  town: Town,
  eventsSeen: number[],
): Event | null => {
  const {
    tier: townTier,
    resources: townResources,
    buildings: townBuildings,
    villagers: townVillagers,
  } = town;

  // Town must meet event's requirements
  const validEvents = EVENTS.filter((event) => {
    const { id, requirements } = event;
    const { tier, resources, buildings, villagers } = requirements;

    if (eventsSeen.includes(id)) {
      return false;
    }

    if (townTier < tier) {
      return false;
    }

    if (
      townResources.Wood < resources.Wood ||
      townResources.Stone < resources.Stone ||
      townResources.Iron < resources.Iron ||
      townResources.Steel < resources.Steel ||
      townResources.Mythril < resources.Mythril ||
      townResources.Amethyst < resources.Amethyst
    ) {
      return false;
    }

    if (
      !buildings.every((building) => townBuildings.includes(building))
    ) {
      return false;
    }

    if (
      !villagers.every((villager) => townVillagers.includes(villager))
    ) {
      return false;
    }

    return true;
  });

  // No valid events for user to see right now
  if (validEvents.length === 0) {
    return null;
  }

  // Choose random event from valid events
  const randomIndex = Math.floor(Math.random() * validEvents.length);
  return validEvents[randomIndex];
};
