// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Typography, useTheme } from "@mui/material";

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

  return (
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
        marginRight: theme.spacing(1),
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
  );
};
