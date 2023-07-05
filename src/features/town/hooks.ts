// REACT
import { useEffect } from "react";

// PUBLIC MODULES
import { useSnackbar } from "notistack";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { TIER_TO_REQUIREMENTS } from "features/town/constants";
// Hooks
import { usePrevious } from "features/common/hooks";
// Interfaces & Types
import type { TierRequirements } from "features/town/types";
// Redux
import { useAppSelector } from "features/redux/hooks";
import {
  selectPlayerBuildingIdToBuilding,
  selectPlayerTown,
  selectPlayerVillagerIdToVillager,
} from "features/town/townSlice";
// Utility functions
import { canAffordResourceAmount } from "features/resource/utils";

export const useCanAdvanceTier = (): boolean => {
  // Hooks
  const town = useAppSelector(selectPlayerTown);

  // Player has reached max tier
  if (town.tier === 5) {
    return false;
  }

  const { resources, buildingIds, villagerIds } =
    TIER_TO_REQUIREMENTS[town.tier + 1];

  // Check player has required buildings
  const townBuildingIds = town.buildings
    .filter((building) => building.state === "built")
    .map((building) => building.id);
  const hasBuildings =
    buildingIds.filter((buildingId) =>
      townBuildingIds.includes(buildingId),
    ).length === buildingIds.length;
  if (!hasBuildings) {
    return false;
  }

  // Check player has required villagers
  const townVillagerIds = town.villagers
    .filter((villager) => villager.state === "healthy")
    .map((villager) => villager.id);
  const hasVillagers =
    villagerIds.filter((villagerId) =>
      townVillagerIds.includes(villagerId),
    ).length === villagerIds.length;
  if (!hasVillagers) {
    return false;
  }

  // Check player has enough resources
  if (!canAffordResourceAmount(town.resources, resources)) {
    return false;
  }

  return true;
};

export const useTierRequirements = (): TierRequirements | null => {
  // Hooks
  const town = useAppSelector(selectPlayerTown);

  if (town.tier === 5) {
    return null;
  }

  return TIER_TO_REQUIREMENTS[town.tier + 1];
};

export const useBuildingNotifications = () => {
  // Hooks
  const { enqueueSnackbar } = useSnackbar();
  const buildingIdToBuilding = useAppSelector(
    selectPlayerBuildingIdToBuilding,
  );
  const previousBuildingIdToBuilding = usePrevious(
    buildingIdToBuilding,
  );

  // Effects
  useEffect(() => {
    if (!previousBuildingIdToBuilding) {
      return;
    }

    const buildingIdsBuilt: number[] = [];
    const buildingIdsRepaired: number[] = [];

    Object.keys(buildingIdToBuilding).forEach((buildingId) => {
      const buildingIdInt = Number(buildingId);
      if (!previousBuildingIdToBuilding[buildingIdInt]) {
        return;
      }

      const building = buildingIdToBuilding[buildingIdInt];
      const previousBuilding =
        previousBuildingIdToBuilding[buildingIdInt];
      if (
        previousBuilding.state === "under construction" &&
        building.state === "built"
      ) {
        buildingIdsBuilt.push(buildingIdInt);
      } else if (
        previousBuilding.state === "being repaired" &&
        building.state === "built"
      ) {
        buildingIdsRepaired.push(buildingIdInt);
      }
    });

    buildingIdsBuilt.forEach((buildingId) => {
      enqueueSnackbar({
        variant: "success",
        message: `${ID_TO_BUILDING[buildingId].name} built`,
      });
    });

    buildingIdsRepaired.forEach((buildingId) => {
      enqueueSnackbar({
        message: `${ID_TO_BUILDING[buildingId].name} repaired`,
      });
    });
  }, [buildingIdToBuilding, previousBuildingIdToBuilding]);
};

export const useVillagerNotifications = () => {
  // Hooks
  const { enqueueSnackbar } = useSnackbar();
  const villagerIdToVillager = useAppSelector(
    selectPlayerVillagerIdToVillager,
  );
  const previousVillagerIdToVillager = usePrevious(
    villagerIdToVillager,
  );

  // Effects
  useEffect(() => {
    if (!previousVillagerIdToVillager) {
      return;
    }

    const villagerIdsHealed: number[] = [];
    Object.keys(villagerIdToVillager).forEach((villagerId) => {
      const villagerIdInt = Number(villagerId);
      if (!previousVillagerIdToVillager[villagerIdInt]) {
        return;
      }

      const villager = villagerIdToVillager[villagerIdInt];
      const previousVillager =
        previousVillagerIdToVillager[villagerIdInt];
      if (
        previousVillager.state === "recovering" &&
        villager.state === "healthy"
      ) {
        villagerIdsHealed.push(villagerIdInt);
      }
    });

    villagerIdsHealed.forEach((villagerId) => {
      enqueueSnackbar({
        message: `${ID_TO_BUILDING[villagerId].name} healed`,
      });
    });
  }, [villagerIdToVillager, previousVillagerIdToVillager]);
};
