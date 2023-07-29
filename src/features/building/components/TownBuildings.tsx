// REACT
import { useState } from "react";
import type { FC } from "react";

// PUBLIC MODULES
import { Grid } from "@mui/material";

// LOCAL FILES
// Components
import {
  BuildingModal,
  TownBuildingTile,
} from "features/building/components";
import {
  ReturnToTownButton,
  StyledContainer,
} from "features/common/components";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Redux
import { openModal } from "features/building/actions";
import { selectAvailableBuildings } from "features/town/townSlice";

export const TownBuildings: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const availableBuildings = useAppSelector(selectAvailableBuildings);

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

  return (
    <StyledContainer>
      <Grid container direction="column">
        <Grid item>
          <ReturnToTownButton />
        </Grid>
        <Grid container item sx={{ mt: 1 }}>
          {availableBuildings.map((building) => (
            <TownBuildingTile
              key={building.id}
              buildingId={building.id}
              hoveringOnBuilding={hoveringOnBuilding === building.id}
              onBuildingClick={onBuildingClick}
              onBuildingMouseEnter={onBuildingMouseEnter}
              onBuildingMouseLeave={onBuildingMouseLeave}
            />
          ))}
        </Grid>
      </Grid>
      <BuildingModal />
    </StyledContainer>
  );
};
