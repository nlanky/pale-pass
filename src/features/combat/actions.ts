// PUBLIC MODULES
import { createAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { BattleOutcome } from "features/combat/types";

export const completeBattle = createAction<BattleOutcome>(
  "combat/completeBattle",
);
