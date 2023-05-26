// REACT
import { useState } from "react";
import type { FC } from "react";

// PUBLIC MODULES
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
// CSS
import "features/town/components/TownBuildings.css";
// Redux
import { useAppSelector } from "features/redux/hooks";
import { selectPlayerBuildings } from "features/town/townSlice";

export const TownBuildings: FC<{}> = () => {
  // Hooks
  const theme = useTheme();
  const buildingIds = useAppSelector(selectPlayerBuildings);

  // Local state
  const [hoveringOnBuilding, setHoveringOnBuilding] = useState<
    number | null
  >(null);
  const [buildingOpen, setBuildingOpen] = useState<number | null>(
    null,
  );

  // Handlers
  const onBuildingMouseEnter = (buildingId: number) => {
    setHoveringOnBuilding(buildingId);
  };

  const onBuildingMouseLeave = () => {
    setHoveringOnBuilding(null);
  };

  const onBuildingClick = (buildingId: number) => {
    setBuildingOpen(buildingId);
  };

  // Derived variables
  const modalBuilding = ID_TO_BUILDING[buildingOpen || NaN];

  return (
    <>
      <Grid
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
          {buildingIds.map((buildingId) => {
            const { id, image, name } = ID_TO_BUILDING[buildingId];

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
                  src={image}
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
                      <Typography align="center" variant="body1">
                        {name}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Dialog
        onClose={() => {
          setBuildingOpen(null);
        }}
        open={buildingOpen !== null}
      >
        {modalBuilding && (
          <>
            <DialogTitle>{modalBuilding.name}</DialogTitle>
            <DialogContent>
              <DialogContentText variant="body1">
                Add description here?
              </DialogContentText>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};
