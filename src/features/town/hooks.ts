// REACT
import { useEffect } from "react";

// PUBLIC MODULES
import { useSnackbar } from "notistack";

// LOCAL FILES
// Hooks
import { usePrevious } from "features/common/hooks";
// Redux
import { useAppSelector } from "features/redux/hooks";
import {
  selectTownBuildingIdToBuilding,
  selectTownVillagerIdToVillager,
} from "features/town/townSlice";

export const useBuildingNotifications = () => {
  // Hooks
  const { enqueueSnackbar } = useSnackbar();
  const buildingIdToBuilding = useAppSelector(
    selectTownBuildingIdToBuilding,
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
        buildingId,
        type: "built",
        variant: "building",
      });
    });

    buildingIdsRepaired.forEach((buildingId) => {
      enqueueSnackbar({
        buildingId,
        type: "repaired",
        variant: "building",
      });
    });
  }, [buildingIdToBuilding, previousBuildingIdToBuilding]);
};

export const useVillagerNotifications = () => {
  // Hooks
  const { enqueueSnackbar } = useSnackbar();
  const villagerIdToVillager = useAppSelector(
    selectTownVillagerIdToVillager,
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
        type: "healed",
        variant: "villager",
        villagerId,
      });
    });
  }, [villagerIdToVillager, previousVillagerIdToVillager]);
};
