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
import { ID_TO_VILLAGER } from "features/villager/constants";
// CSS
import "features/town/components/TownBuildings.css";
// Redux
import { useAppSelector } from "features/redux/hooks";
import { selectPlayerVillagers } from "features/town/townSlice";

export const TownVillagers: FC<{}> = () => {
  // Hooks
  const theme = useTheme();
  const villagerIds = useAppSelector(selectPlayerVillagers);

  // Local state
  const [hoveringOnVillager, setHoveringOnVillager] = useState<
    number | null
  >(null);
  const [villagerOpen, setVillagerOpen] = useState<number | null>(
    null,
  );

  // Handlers
  const onVillagerMouseEnter = (villagerId: number) => {
    setHoveringOnVillager(villagerId);
  };

  const onVillagerMouseLeave = () => {
    setHoveringOnVillager(null);
  };

  const onVillagerClick = (villagerId: number) => {
    setVillagerOpen(villagerId);
  };

  // Derived variables
  const modalVillager = ID_TO_VILLAGER[villagerOpen || NaN];

  if (villagerIds.length === 0) {
    return null;
  }

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
          Villagers
        </Typography>
        <Grid
          className="townBuildingContainer"
          container
          item
          sx={{ overflowX: "auto" }}
          wrap="nowrap"
        >
          {villagerIds.map((villagerId) => {
            const { id, image, name } = ID_TO_VILLAGER[villagerId];

            return (
              <Grid
                key={id}
                container
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
                {hoveringOnVillager === id && (
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
      </Grid>
      <Dialog
        onClose={() => {
          setVillagerOpen(null);
        }}
        open={villagerOpen !== null}
      >
        {modalVillager && (
          <>
            <DialogTitle>{modalVillager.name}</DialogTitle>
            <DialogContent>
              <DialogContentText variant="body2">
                Add description here?
              </DialogContentText>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};
