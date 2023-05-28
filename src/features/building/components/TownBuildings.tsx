// REACT
import { useState } from "react";
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Typography, useTheme } from "@mui/material";

// LOCAL FILES
// Components
import { BuildingModal } from "features/building/components";
import {
  StyledButton,
  StyledContainer,
} from "features/common/components";
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
// Redux
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
import { openModal } from "features/building/buildingSlice";
import { setView } from "features/game/gameSlice";
import { selectPlayerBuildings } from "features/town/townSlice";

export const TownBuildings: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const townBuildings = useAppSelector(selectPlayerBuildings);

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

  const onReturnToTown = () => {
    dispatch(setView("town"));
  };

  return (
    <StyledContainer>
      <Grid container direction="column">
        <Grid item>
          <StyledButton onClick={onReturnToTown}>
            Return to Town
          </StyledButton>
        </Grid>
        <Grid container item sx={{ marginTop: theme.spacing(1) }}>
          {townBuildings.map((townBuilding) => {
            const { id, state } = townBuilding;
            const { icons, name } = ID_TO_BUILDING[id];
            return (
              <Grid
                key={id}
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
                  src={icons[state]}
                  style={{ width: 128, height: 128 }}
                />
                <Typography variant="body2">{name}</Typography>
                {hoveringOnBuilding === id && (
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
          })}
        </Grid>
      </Grid>
      <BuildingModal />
    </StyledContainer>
  );
};
