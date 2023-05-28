// REACT
import { useState } from "react";
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Typography, useTheme } from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";

// LOCAL FILES
// Components
import { StyledGrid } from "features/common/components";
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
// CSS
import "features/town/components/TownBuildings.css";
// Redux
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
import { openModal } from "features/building/buildingSlice";
import { selectPlayerBuildings } from "features/town/townSlice";

export const TownBuildings: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const buildings = useAppSelector(selectPlayerBuildings);

  // Local state
  const [hoveringOnBuilding, setHoveringOnBuilding] = useState<
    number | null
  >(null);

  // Handlers
  const onBuildingMouseEnter = (buildingId: number) => {
    setHoveringOnBuilding(buildingId);
  };

  const onBuildingMouseLeave = () => {
    setHoveringOnBuilding(null);
  };

  const onBuildingClick = (buildingId: number) => {
    dispatch(openModal(buildingId));
  };

  if (buildings.length === 0) {
    return null;
  }

  return (
    <StyledGrid
      alignItems="center"
      container
      sx={{ marginTop: theme.spacing(1) }}
      wrap="nowrap"
    >
      <Typography
        component="h2"
        sx={{ marginRight: theme.spacing(1) }}
        variant="h4"
      >
        Buildings
      </Typography>
      <Grid
        className="townBuildingContainer"
        container
        item
        sx={{ overflowX: "auto" }}
        wrap="nowrap"
      >
        {buildings.map((townBuilding) => {
          const { state } = townBuilding;
          const { id, icons, name } = ID_TO_BUILDING[townBuilding.id];

          return (
            <Grid
              key={id}
              container
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
                maxWidth: 100,
                position: "relative",
              }}
            >
              <img
                alt={name}
                src={icons[state]}
                style={{
                  width: "100%",
                }}
              />
              {hoveringOnBuilding === id && (
                <Grid
                  alignItems="center"
                  container
                  item
                  justifyContent="center"
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    color: "white",
                  }}
                >
                  <Grid
                    alignItems="center"
                    container
                    item
                    justifyContent="center"
                  >
                    <InfoIcon />
                    <Typography align="center" variant="body2">
                      {name}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          );
        })}
      </Grid>
    </StyledGrid>
  );
};
