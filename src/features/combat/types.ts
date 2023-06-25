// LOCAL FILES
// Interfaces & Types
import type { VillagerState } from "features/villager/types";

export type VictoryState = "Defeat" | "Stalemate" | "Victory";

export interface BattleVillager {
  /** Matches villager ID */
  id: number;
  state: VillagerState;
}

export interface BattleOutcome {
  enemyPlayerId: number;
  victoryState: VictoryState;
  /** New state of villagers involved in battle */
  villagers: BattleVillager[];
}

export interface MilitaryStrength {
  handToHand: number;
  archery: number;
  mounted: number;
}

export interface DisplayMilitaryStrength {
  handToHand: string;
  archery: string;
  mounted: string;
}
