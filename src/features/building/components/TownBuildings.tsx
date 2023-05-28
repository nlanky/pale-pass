// REACT
import { useState } from "react";
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, useTheme } from "@mui/material";

// LOCAL FILES
// Components
import {
  BuildingModal,
  TownBuildingTile,
} from "features/building/components";
import {
  StyledButton,
  StyledContainer,
} from "features/common/components";
// Hooks
import { useAvailableBuildings } from "features/building/hooks";
// Interfaces & Types
import type { TownBuilding } from "features/town/types";
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
  const availableBuildings = useAvailableBuildings();

  // Local state
  const [hoveringOnBuilding, setHoveringOnBuilding] = useState<
    number | null
  >(null);

  // Derived variables
  const idToTownBuilding: Record<number, TownBuilding> = {};
  townBuildings.forEach((townBuilding) => {
    idToTownBuilding[townBuilding.id] = townBuilding;
  });

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
          {availableBuildings.map((building) => {
            const { id } = building;

            return (
              <TownBuildingTile
                key={id}
                building={building}
                townBuilding={idToTownBuilding[id]}
                hoveringOnBuilding={hoveringOnBuilding === id}
                onBuildingClick={onBuildingClick}
                onBuildingMouseEnter={onBuildingMouseEnter}
                onBuildingMouseLeave={onBuildingMouseLeave}
              />
            );
          })}
        </Grid>
      </Grid>
      <BuildingModal />
    </StyledContainer>
  );
};
