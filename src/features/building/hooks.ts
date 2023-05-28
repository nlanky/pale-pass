// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
// Interfaces & Types
import type { Building } from "features/building/types";
// Redux
import { useAppSelector } from "features/redux/hooks";
import { selectPlayerTown } from "features/town/townSlice";
import { TownBuilding } from "features/town/types";

/**
 * Returns all buildings that should be available to the player
 * at this point of the game.
 */
export const useAvailableBuildings = (): Building[] => {
  // Hooks
  const { buildings: townBuildings, tier } =
    useAppSelector(selectPlayerTown);

  // Derived variables
  const idToTownBuilding: Record<number, TownBuilding> = {};
  townBuildings.forEach((townBuilding) => {
    idToTownBuilding[townBuilding.id] = townBuilding;
  });

  return Object.values(ID_TO_BUILDING)
    .filter(
      (building) =>
        (building.canBuild || idToTownBuilding[building.id]) &&
        building.requirements.tier <= tier,
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
