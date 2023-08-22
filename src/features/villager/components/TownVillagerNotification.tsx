// REACT
import { forwardRef } from "react";

// PUBLIC MODULES
import { Card, Typography } from "@mui/material";
import { SnackbarContent } from "notistack";
import type { CustomContentProps } from "notistack";

// LOCAL FILES
// Components
import { VillagerAvatar } from "features/villager/components";
// Constants
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type { VillagerNotificationType } from "features/villager/types";

interface VillagerProps extends CustomContentProps {
  villagerId: number;
  type: VillagerNotificationType;
}

export const TownVillagerNotification = forwardRef<
  HTMLDivElement,
  VillagerProps
>(({ villagerId, type }, ref) => {
  // Derived variables
  const villager = ID_TO_VILLAGER[villagerId];

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
        <VillagerAvatar
          villagerId={villagerId}
          hideStateOverlay
          hideStateText
          width={40}
          height={40}
        />
        <Typography color="white" sx={{ ml: 1 }} variant="body2">
          {`${villager.name} ${type}`}
        </Typography>
      </Card>
    </SnackbarContent>
  );
});
