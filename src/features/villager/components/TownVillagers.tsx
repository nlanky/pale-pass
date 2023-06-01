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
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
import { useAvailableVillagers } from "features/villager/hooks";
// Interfaces & Types
import type { TownVillager } from "features/town/types";
// Redux
import { selectPlayerVillagers } from "features/town/townSlice";
import { openModal } from "features/villager/villagerSlice";

export const TownVillagers: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const townVillagers = useAppSelector(selectPlayerVillagers);
  const availableVillagers = useAvailableVillagers();

  // Local state
  const [hoveringOnVillager, setHoveringOnVillager] = useState<
    number | null
  >(null);

  // Derived variables
  const idToTownVillager: Record<number, TownVillager> = {};
  townVillagers.forEach((townVillager) => {
    idToTownVillager[townVillager.id] = townVillager;
  });

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
      <Grid container direction="column">
        <Grid item>
          <ReturnToTownButton />
        </Grid>
        <Grid container item sx={{ marginTop: theme.spacing(1) }}>
          {availableVillagers.map((villager) => {
            const { id } = villager;

            return (
              <TownVillagerTile
                key={id}
                villager={villager}
                townVillager={idToTownVillager[id]}
                hoveringOnVillager={hoveringOnVillager === id}
                onVillagerClick={onVillagerClick}
                onVillagerMouseEnter={onVillagerMouseEnter}
                onVillagerMouseLeave={onVillagerMouseLeave}
              />
            );
          })}
        </Grid>
      </Grid>
      <VillagerModal />
    </StyledContainer>
  );
};
