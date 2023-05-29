// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Badge, Grid, Typography, useTheme } from "@mui/material";
import {
  Healing as HealingIcon,
  MonitorHeart as MonitorHeartIcon,
} from "@mui/icons-material";

// LOCAL FILES
// Interfaces & Types
import type { TownVillager } from "features/town/types";
import type { Villager } from "features/villager/types";

interface TownVillagerTileProps {
  villager: Villager;
  townVillager?: TownVillager;
  hoveringOnVillager: boolean;
  onVillagerClick: (id: number) => void;
  onVillagerMouseEnter: (id: number) => void;
  onVillagerMouseLeave: () => void;
}

export const TownVillagerTile: FC<TownVillagerTileProps> = ({
  villager,
  townVillager,
  hoveringOnVillager,
  onVillagerClick,
  onVillagerMouseEnter,
  onVillagerMouseLeave,
}) => {
  // Hooks
  const theme = useTheme();

  // Derived variables
  const { id, name, icons } = villager;
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
          <Typography
            sx={{ marginLeft: theme.spacing(0.25) }}
            variant="body1"
          >
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
          cursor: "pointer",
          position: "relative",
          width: "auto",
        }}
      >
        <img
          src={icons[state || "healthy"]}
          style={{ width: 128, height: 128 }}
        />
        <Typography variant="body2">{name}</Typography>
        {hoveringOnVillager && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: `3px solid ${theme.palette.parchmentDark.main}`,
            }}
          />
        )}
      </Grid>
    </Badge>
  );
};
