// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Badge, Grid, Typography, useTheme } from "@mui/material";
import {
  Build as BuildIcon,
  Construction as ConstructionIcon,
} from "@mui/icons-material";

// LOCAL FILES
// Interfaces & Types
import type { Building } from "features/building/types";
import type { TownBuilding } from "features/town/types";

interface TownBuildingTileProps {
  building: Building;
  townBuilding?: TownBuilding;
  hoveringOnBuilding: boolean;
  onBuildingClick: (id: number) => void;
  onBuildingMouseEnter: (id: number) => void;
  onBuildingMouseLeave: () => void;
}

export const TownBuildingTile: FC<TownBuildingTileProps> = ({
  building,
  townBuilding,
  hoveringOnBuilding,
  onBuildingClick,
  onBuildingMouseEnter,
  onBuildingMouseLeave,
}) => {
  // Hooks
  const theme = useTheme();

  // Derived variables
  const { id, name, icons } = building;
  const state = townBuilding?.state;

  // Utility functions
  const getBadgeContent = () => {
    if (state === "being repaired") {
      return (
        <>
          <ConstructionIcon />
          <Typography
            sx={{ marginLeft: theme.spacing(0.25) }}
            variant="body1"
          >
            {townBuilding?.repairTimeRemaining}
          </Typography>
        </>
      );
    }

    if (state === "under construction") {
      return (
        <>
          <BuildIcon />
          <Typography
            sx={{ marginLeft: theme.spacing(0.25) }}
            variant="body1"
          >
            {townBuilding?.buildTimeRemaining}
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
          onBuildingClick(id);
        }}
        onMouseEnter={() => {
          onBuildingMouseEnter(id);
        }}
        onMouseLeave={() => {
          onBuildingMouseLeave();
        }}
        sx={{
          cursor: "pointer",
          position: "relative",
          width: "auto",
        }}
      >
        <img
          src={icons[state || "built"]}
          style={{ width: 128, height: 128 }}
        />
        <Typography variant="body2">{name}</Typography>
        {hoveringOnBuilding && (
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
