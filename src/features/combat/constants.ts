// LOCAL FILES
// Interfaces & Types
import type { MilitaryStrength } from "features/combat/types";

export const PLAYER_ID_TO_MILITARY_STRENGTH: Record<
  number,
  MilitaryStrength
> = {
  // ID 1 is player so this will be unused
  1: {
    handToHand: 0,
    archery: 0,
    mounted: 0,
  },
  2: {
    handToHand: 1,
    archery: 2,
    mounted: 1,
  },
  3: {
    handToHand: 2,
    archery: 1,
    mounted: 2,
  },
  4: {
    handToHand: 3,
    archery: 3,
    mounted: 3,
  },
};

/*
  How to interpret these numbers

  - Imagine a scale from 0 to 1
  - Villager has STALEMATE_DEATH_BASE_PROBABILITY chance to die
  - Villager has STALEMATE_INJURY_BASE_PROBABILITY chance to be injured
  - Otherwise, villager will be healthy

  These are referred to as base probabilities as they are modified by the
  differences between a villager's military strength in the 3 different
  combat types and the enemy's military strength in those types
  (OUTCOME_PROBABILITY_MODIFIER).

  Example to illustrate:
  - Villager has 1 hand to hand, 1 archery, and 5 mounted
  - Enemy has 2 hand to hand, 3 archery, and 4 mounted
  - Player is defeated in the overall military strength calculation
  - Differences: -1 (hand to hand) -2 (archery) +1 (mounted) = -2 (overall)
  - Probability of death: 0.1 (base) + 0.02 * 2 (modifier) = 0.14 (14%)
  - Probability of injury: 0.2 (base) + 0.02 * 2 (modifier) = 0.24 (24%)
  - This means there is a 62% chance the villager is healthy
*/
export const STALEMATE_DEATH_BASE_PROBABILITY = 0.05;
export const STALEMATE_INJURY_BASE_PROBABILITY = 0.1;
export const DEFEAT_DEATH_BASE_PROBABILITY = 0.1;
export const DEFEAT_INJURY_BASE_PROBABILITY = 0.2;
export const VICTORY_DEATH_BASE_PROBABILITY = 0.01;
export const VICTORY_INJURY_BASE_PROBABILITY = 0.05;
export const OUTCOME_PROBABILITY_MODIFIER = 0.02;
