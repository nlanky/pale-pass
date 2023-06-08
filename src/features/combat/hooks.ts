// LOCAL FILES
// Constants
import { PLAYER_ID_TO_MILITARY_STRENGTH } from "features/combat/constants";
// Hooks
import { useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { DisplayMilitaryStrength } from "features/combat/types";
// Redux
import { selectPlayerSpies } from "features/town/townSlice";

export const useEnemyDisplayMilitaryStrength = (
  playerId: number | null,
): DisplayMilitaryStrength => {
  const numberOfSpies = useAppSelector(selectPlayerSpies);

  if (!playerId) {
    return {
      handToHand: "-",
      archery: "-",
      mounted: "-",
    };
  }

  const enemyMilitaryStrength =
    PLAYER_ID_TO_MILITARY_STRENGTH[playerId];
  const showHandToHand = numberOfSpies >= 3 * playerId - 5;
  const showArchery = numberOfSpies >= 3 * playerId - 4;
  const showMounted = numberOfSpies >= 3 * playerId - 3;
  return {
    handToHand: showHandToHand
      ? enemyMilitaryStrength.handToHand.toString()
      : "?",
    archery: showArchery
      ? enemyMilitaryStrength.archery.toString()
      : "?",
    mounted: showMounted
      ? enemyMilitaryStrength.mounted.toString()
      : "?",
  };
};
