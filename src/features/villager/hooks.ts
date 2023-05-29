// LOCAL FILES
// Constants
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type { TownVillager } from "features/town/types";
import type { Villager } from "features/villager/types";
// Redux
import { useAppSelector } from "features/redux/hooks";
import { selectPlayerTown } from "features/town/townSlice";

/**
 * Returns all villagers that should be available to the player
 * at this point of the game.
 */
export const useAvailableVillagers = (): Villager[] => {
  // Hooks
  const { villagers: townVillagers, tier } =
    useAppSelector(selectPlayerTown);

  // Derived variables
  const idToTownVillager: Record<number, TownVillager> = {};
  townVillagers.forEach((townVillager) => {
    idToTownVillager[townVillager.id] = townVillager;
  });

  return Object.values(ID_TO_VILLAGER)
    .filter(
      (villager) =>
        idToTownVillager[villager.id] ||
        (villager.canRecruit && villager.requirements.tier <= tier),
    )
    .sort((buildingA, buildingB) => {
      const { tier: tierA } = buildingA.requirements;
      const { tier: tierB } = buildingB.requirements;
      if (tierA === tierB) {
        return buildingA.name < buildingB.name ? -1 : 1;
      }

      return tierA < tierB ? -1 : 1;
    });
};
