// LOCAL FILES
// Constants
import {
  DEFEAT_DEATH_BASE_PROBABILITY,
  DEFEAT_INJURY_BASE_PROBABILITY,
  OUTCOME_PROBABILITY_MODIFIER,
  STALEMATE_DEATH_BASE_PROBABILITY,
  STALEMATE_INJURY_BASE_PROBABILITY,
  VICTORY_DEATH_BASE_PROBABILITY,
  VICTORY_INJURY_BASE_PROBABILITY,
} from "features/combat/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type {
  BattleOutcome,
  MilitaryStrength,
  VictoryState,
} from "features/combat/types";
import type { VillagerState } from "features/villager/types";

/**
 * Gets average of villagers' military strengths
 */
export const getMilitaryStrength = (
  villagerIds: (number | null)[],
): MilitaryStrength => {
  // Filter out unselected
  const selectedVillagerIds = villagerIds.filter(
    (villagerId) => villagerId !== null,
  ) as number[];
  const numberOfVillagers = selectedVillagerIds.length;

  // Avoid dividing by 0
  if (numberOfVillagers === 0) {
    return {
      handToHand: 0,
      archery: 0,
      mounted: 0,
    };
  }

  let totalHandToHand = 0;
  let totalArchery = 0;
  let totalMounted = 0;

  selectedVillagerIds.forEach((villagerId) => {
    const { handToHand, archery, mounted } =
      ID_TO_VILLAGER[villagerId].militaryStrength;
    totalHandToHand += handToHand;
    totalArchery += archery;
    totalMounted += mounted;
  });

  return {
    handToHand: Math.round(totalHandToHand / numberOfVillagers),
    archery: Math.round(totalArchery / numberOfVillagers),
    mounted: Math.round(totalMounted / numberOfVillagers),
  };
};

/**
 * Compares player's military strength to enemy's to decide the outcome of a battle.
 * Villagers may become injured or die
 */
export const determineBattleOutcome = (
  playerMilitaryStrength: MilitaryStrength,
  enemyPlayerId: number,
  enemyMilitaryStrength: MilitaryStrength,
  villagerIds: number[],
): BattleOutcome => {
  const {
    handToHand: playerHandToHand,
    archery: playerArchery,
    mounted: playerMounted,
  } = playerMilitaryStrength;
  const {
    handToHand: enemyHandToHand,
    archery: enemyArchery,
    mounted: enemyMounted,
  } = enemyMilitaryStrength;

  const outcomesByType = {
    defeat: 0,
    stalemate: 0,
    victory: 0,
  };
  if (playerHandToHand > enemyHandToHand) {
    outcomesByType.victory += 1;
  } else if (playerHandToHand === enemyHandToHand) {
    outcomesByType.stalemate += 1;
  } else {
    outcomesByType.defeat += 1;
  }

  if (playerArchery > enemyArchery) {
    outcomesByType.victory += 1;
  } else if (playerArchery === enemyArchery) {
    outcomesByType.stalemate += 1;
  } else {
    outcomesByType.defeat += 1;
  }

  if (playerMounted > enemyMounted) {
    outcomesByType.victory += 1;
  } else if (playerMounted === enemyMounted) {
    outcomesByType.stalemate += 1;
  } else {
    outcomesByType.defeat += 1;
  }

  let victoryState: VictoryState;
  if (outcomesByType.victory >= 2) {
    victoryState = "victory";
  } else if (outcomesByType.defeat >= 2) {
    victoryState = "defeat";
  } else {
    victoryState = "stalemate";
  }

  // Determine if villagers get injured or die
  const nextVillagersState: { id: number; state: VillagerState }[] =
    [];
  villagerIds.forEach((villagerId) => {
    // See /combat/constants for explanation on all of this
    const { id, militaryStrength } = ID_TO_VILLAGER[villagerId];
    const { handToHand, archery, mounted } = militaryStrength;

    let deathProbability = 0;
    let injuryProbability = 0;
    switch (victoryState) {
      case "victory":
        deathProbability += VICTORY_DEATH_BASE_PROBABILITY;
        injuryProbability += VICTORY_INJURY_BASE_PROBABILITY;
        break;
      case "stalemate":
        deathProbability += STALEMATE_DEATH_BASE_PROBABILITY;
        injuryProbability += STALEMATE_INJURY_BASE_PROBABILITY;
        break;
      case "defeat":
        deathProbability += DEFEAT_DEATH_BASE_PROBABILITY;
        injuryProbability += DEFEAT_INJURY_BASE_PROBABILITY;
        break;
      default:
        break;
    }

    const probabilityModifier =
      OUTCOME_PROBABILITY_MODIFIER *
      (enemyHandToHand -
        handToHand +
        (enemyArchery - archery) +
        (enemyMounted - mounted));

    const roll = Math.random();
    if (roll < deathProbability + probabilityModifier) {
      nextVillagersState.push({
        id,
        state: "dead",
      });
    } else if (
      roll <
      deathProbability + injuryProbability + probabilityModifier
    ) {
      nextVillagersState.push({
        id,
        state: "dead",
      });
    } else {
      nextVillagersState.push({
        id,
        state: "healthy",
      });
    }
  });

  return {
    enemyPlayerId,
    victoryState,
    villagers: nextVillagersState,
  };
};
