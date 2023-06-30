// REACT
import type { FC } from "react";
import { useEffect, useState } from "react";

// PUBLIC MODULES
import { Alert, Snackbar } from "@mui/material";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
// Hooks
import { usePrevious } from "features/common/hooks";
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectPlayerBuildingIdToBuilding } from "features/town/townSlice";

export const TownBuildingNotification: FC<{}> = () => {
  // Hooks
  const buildingIdToBuilding = useAppSelector(
    selectPlayerBuildingIdToBuilding,
  );
  const previousBuildingIdToBuilding = usePrevious(
    buildingIdToBuilding,
  );

  // Local State
  const [notification, setNotification] = useState<{
    showing: boolean;
    content: string;
  }>({ showing: false, content: "" });

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

    if (
      buildingIdsBuilt.length === 0 &&
      buildingIdsRepaired.length === 0
    ) {
      return;
    }

    let nextContent = "";
    buildingIdsBuilt.forEach((buildingId) => {
      nextContent += `${ID_TO_BUILDING[buildingId].name} built. `;
    });
    buildingIdsRepaired.forEach((buildingId) => {
      nextContent += `${ID_TO_BUILDING[buildingId].name} repaired. `;
    });

    setNotification({
      showing: true,
      content: nextContent,
    });
  }, [buildingIdToBuilding, previousBuildingIdToBuilding]);

  // Handlers
  const onSnackbarClose = () => {
    setNotification({
      ...notification,
      showing: false,
    });
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={5000}
      onClose={onSnackbarClose}
      open={notification.showing}
    >
      <Alert severity="info">{notification.content}</Alert>
    </Snackbar>
  );
};
