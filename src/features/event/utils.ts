// LOCAL FILES
// Constants
import { EVENTS } from "features/event/constants";
// Interfaces & Types
import type { Event } from "features/event/types";
import type { Town } from "features/town/types";

/**
 * Filter event list to return only valid events. Each event has a set of
 * requirements that town must meet. Player must also not have seen event
 * before.
 */
export const getValidEvents = (town: Town, eventsSeen: number[]) => {
  const {
    tier: townTier,
    resources: townResources,
    buildings: townBuildings,
    villagers: townVillagers,
  } = town;

  return EVENTS.filter((event) => {
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
};

/**
 * Returns random valid event.
 */
export const getValidEvent = (
  town: Town,
  eventsSeen: number[],
): Event | null => {
  const validEvents = getValidEvents(town, eventsSeen);

  // No valid events for user to see right now
  if (validEvents.length === 0) {
    return null;
  }

  return getRandomEvent(validEvents);
};

export const getRandomEvent = (events: Event[]): Event =>
  events[Math.floor(Math.random() * events.length)];
