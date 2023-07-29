// PUBLIC MODULES
import { createAction } from "@reduxjs/toolkit";

// LOCAL FILES
// Interfaces & Types
import type { Pronouns } from "features/player/types";

export const setNameAndPronouns = createAction<{
  name: string;
  pronouns: Pronouns;
}>("player/setNameAndPronouns");
