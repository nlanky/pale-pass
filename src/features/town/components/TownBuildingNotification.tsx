// REACT
import { forwardRef } from "react";

// PUBLIC MODULES
import { Avatar, Card, Typography } from "@mui/material";
import { SnackbarContent } from "notistack";
import type { CustomContentProps } from "notistack";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
// Interfaces & Types
import type { BuildingNotificationType } from "features/building/types";

interface BuildingProps extends CustomContentProps {
  buildingId: number;
  type: BuildingNotificationType;
}

export const TownBuildingNotification = forwardRef<
  HTMLDivElement,
  BuildingProps
>(({ buildingId, type }, ref) => {
  // Derived variables
  const building = ID_TO_BUILDING[buildingId];

  return (
    <SnackbarContent ref={ref}>
      <Card
        sx={{
          alignItems: "center",
          bgcolor: "success.main",
          display: "flex",
          flexWrap: "nowrap",
          p: 1,
          width: "100%",
        }}
      >
        <Avatar alt={building.name} src={building.icons["built"]} />
        <Typography color="white" sx={{ ml: 1 }} variant="body2">
          {`${building.name} ${type}`}
        </Typography>
      </Card>
    </SnackbarContent>
  );
});
