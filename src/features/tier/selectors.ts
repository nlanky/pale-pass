// PUBLIC MODULES
import { createSelector } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import {
  TIER_TO_ENABLED_RESOURCES,
  TIER_TO_REQUIREMENTS,
  TIER_TO_RESOURCES_PER_DAY,
  TIER_TO_SCREENS,
} from "features/tier/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";

export const selectTownTier = (state: RootState) => state.town.tier;

export const selectTierRequirements = createSelector(
  [selectTownTier],
  (tier) => TIER_TO_REQUIREMENTS[tier + 1],
);

export const selectEnabledResources = createSelector(
  [selectTownTier],
  (tier) => TIER_TO_ENABLED_RESOURCES[tier],
);

export const selectTierScreens = createSelector(
  [selectTownTier],
  (tier) => TIER_TO_SCREENS[tier],
);

export const selectTierResourcesPerDay = createSelector(
  [selectTownTier],
  (tier) => TIER_TO_RESOURCES_PER_DAY[tier],
);
