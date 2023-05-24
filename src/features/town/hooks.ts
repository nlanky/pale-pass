// REACT
import { useEffect, useState } from "react";

// LOCAL FILES
// Constants
import { TIER_TO_REQUIREMENTS } from "features/town/constants";
// Interfaces & Types
import type { Resource } from "features/resource/types";
import type { TierRequirements } from "features/town/types";
// Redux
import { useAppSelector } from "features/redux/hooks";
import { selectPlayerTown } from "features/town/townSlice";
// Utility functions
import { mergeResources } from "features/resource/utils";

export const useCanAdvanceTier = (): boolean => {
  // Hooks
  const town = useAppSelector(selectPlayerTown);

  // Local state
  const [canAdvance, setCanAdvance] = useState(false);

  useEffect(() => {
    // Player has reached max tier
    if (town.tier === 5) {
      setCanAdvance(false);
      return;
    }

    const { resources, buildings, villagers } =
      TIER_TO_REQUIREMENTS[town.tier + 1];

    // Check player has required buildings
    const hasBuildings =
      buildings.filter((building) =>
        town.buildings.includes(building),
      ).length === buildings.length;
    if (!hasBuildings) {
      setCanAdvance(false);
      return;
    }

    // Check player has required villagers
    const hasVillagers =
      villagers.filter((villager) =>
        town.villagers.includes(villager),
      ).length === villagers.length;
    if (!hasVillagers) {
      setCanAdvance(false);
      return;
    }

    // Check player has enough resources
    const resourcesAfterAdvance = mergeResources(
      town.resources,
      resources,
    );
    for (const resource in resourcesAfterAdvance) {
      if (resourcesAfterAdvance[resource as Resource] < 0) {
        setCanAdvance(false);
        return;
      }
    }

    setCanAdvance(true);
  }, [town]);

  return canAdvance;
};

export const useTierRequirements = (): TierRequirements | null => {
  // Hooks
  const town = useAppSelector(selectPlayerTown);

  // Local state
  const [tierRequirements, setTierRequirements] =
    useState<TierRequirements | null>(null);

  // Effects
  useEffect(() => {
    if (town.tier === 5) {
      setTierRequirements(null);
      return;
    }

    setTierRequirements(TIER_TO_REQUIREMENTS[town.tier + 1]);
  }, [town]);

  return tierRequirements;
};
