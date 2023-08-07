// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Badge, Grid, Typography } from "@mui/material";
import {
  Healing as HealingIcon,
  MonitorHeart as MonitorHeartIcon,
} from "@mui/icons-material";

// LOCAL FILES
// Constants
import { ID_TO_VILLAGER } from "features/villager/constants";
// Hooks
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectTownVillager } from "features/town/townSlice";
import { VillagerAvatar } from ".";

interface TownVillagerTileProps {
  villagerId: number;
  hoveringOnVillager: boolean;
  onVillagerClick: (id: number) => void;
  onVillagerMouseEnter: (id: number) => void;
  onVillagerMouseLeave: () => void;
}

export const TownVillagerTile: FC<TownVillagerTileProps> = ({
  villagerId,
  hoveringOnVillager,
  onVillagerClick,
  onVillagerMouseEnter,
  onVillagerMouseLeave,
}) => {
  // Hooks
  const townVillager = useAppSelector(selectTownVillager(villagerId));

  // Derived variables
  const { id, name } = ID_TO_VILLAGER[villagerId];
  const state = townVillager?.state;

  // Utility functions
  const getBadgeContent = () => {
    if (state === "injured") {
      return <MonitorHeartIcon />;
    }

    if (state === "recovering") {
      return (
        <>
          <HealingIcon />
          <Typography sx={{ ml: 0.25 }} variant="body1">
            {townVillager?.recoveryTimeRemaining}
          </Typography>
        </>
      );
    }

    return null;
  };

  return (
    <Badge badgeContent={getBadgeContent()} overlap="circular">
      <Grid
        alignItems="center"
        container
        direction="column"
        item
        justifyContent="center"
        onClick={() => {
          onVillagerClick(id);
        }}
        onMouseEnter={() => {
          onVillagerMouseEnter(id);
        }}
        onMouseLeave={() => {
          onVillagerMouseLeave();
        }}
        sx={{
          backgroundColor: hoveringOnVillager
            ? "action.hover"
            : "transparent",
          cursor: "pointer",
          p: 1,
          position: "relative",
          width: "auto",
        }}
      >
        <VillagerAvatar villagerId={villagerId} hideStateText />
        <Typography sx={{ mt: 1 }} variant="body2">
          {name}
        </Typography>
      </Grid>
    </Badge>
  );
};
