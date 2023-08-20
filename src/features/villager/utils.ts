// LOCAL FILES
// Constants
import {
  ID_TO_VILLAGER,
  NO_VILLAGER_REQUIREMENTS,
} from "features/villager/constants";
// Interfaces & Types
import type { TownVillager } from "features/town/types";
import type {
  Villager,
  VillagerRequirements,
} from "features/villager/types";

/**
 * Simple function to create a full VillagerRequirements object from a partial definition.
 */
export const getVillagerRequirements = (
  requirements: Partial<VillagerRequirements>,
): VillagerRequirements =>
  Object.assign({ ...NO_VILLAGER_REQUIREMENTS }, requirements);

export const sortVillagers = (
  villagerA: Villager,
  villagerB: Villager,
): number => {
  const { tier: tierA } = villagerA.requirements;
  const { tier: tierB } = villagerB.requirements;
  if (tierA === tierB) {
    return villagerA.name < villagerB.name ? -1 : 1;
  }

  return tierA < tierB ? -1 : 1;
};

export const sortTownVillagers = (
  villagerA: TownVillager,
  villagerB: TownVillager,
): number => {
  const { name: nameA, requirements: requirementsA } =
    ID_TO_VILLAGER[villagerA.id];
  const { name: nameB, requirements: requirementsB } =
    ID_TO_VILLAGER[villagerB.id];
  const { tier: tierA } = requirementsA;
  const { tier: tierB } = requirementsB;
  if (tierA === tierB) {
    return nameA < nameB ? -1 : 1;
  }

  return tierA < tierB ? -1 : 1;
};
