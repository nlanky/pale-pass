// REACT
import { useState } from "react";
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, useTheme } from "@mui/material";

// LOCAL FILES
// Components
import {
  TownVillagerTile,
  VillagerModal,
} from "features/villager/components";
import {
  ReturnToTownButton,
  StyledContainer,
} from "features/common/components";
// Constants
import { BUTTON_HEIGHT } from "features/common/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Redux
import { selectAvailableVillagers } from "features/town/townSlice";
import { openModal } from "features/villager/actions";

export const TownVillagers: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const availableVillagers = useAppSelector(selectAvailableVillagers);

  // Local state
  const [hoveringOnVillager, setHoveringOnVillager] = useState<
    number | null
  >(null);

  // Handlers
  const onVillagerMouseEnter = (villagerId: number) => {
    setHoveringOnVillager(villagerId);
  };

  const onVillagerMouseLeave = () => {
    setHoveringOnVillager(null);
  };

  const onVillagerClick = (villagerId: number) => {
    dispatch(openModal(villagerId));
  };

  return (
    <StyledContainer>
      <Grid item>
        <ReturnToTownButton />
      </Grid>
      <Grid
        container
        item
        sx={{
          height: `calc(100% - ${BUTTON_HEIGHT}px - ${theme.gap(
            2,
          )})px`,
          mt: 2,
          overflowY: "auto",
        }}
      >
        {availableVillagers.map((villager) => (
          <TownVillagerTile
            key={villager.id}
            villagerId={villager.id}
            hoveringOnVillager={hoveringOnVillager === villager.id}
            onVillagerClick={onVillagerClick}
            onVillagerMouseEnter={onVillagerMouseEnter}
            onVillagerMouseLeave={onVillagerMouseLeave}
          />
        ))}
      </Grid>
      <VillagerModal />
    </StyledContainer>
  );
};
