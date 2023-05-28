// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Container, Grid } from "@mui/material";

// LOCAL FILES
// Components
import {
  TownAdvanceTierButton,
  TownBuildingsButton,
  TownExploreButton,
  TownImage,
  TownResources,
  TownVillagers,
} from "features/town/components";
// Hooks
import { useEventTimer } from "features/event/hooks";
import { useTurnTimer } from "features/game/hooks";

export const TownView: FC<{}> = () => {
  // Hooks
  useTurnTimer();
  useEventTimer();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1} wrap="nowrap">
        <Grid item xs={10}>
          <TownImage />
        </Grid>
        <Grid container direction="column" item spacing={1} xs={2}>
          <Grid item>
            <TownResources />
          </Grid>
          <Grid item>
            <TownExploreButton />
          </Grid>
          <Grid item>
            <TownAdvanceTierButton />
          </Grid>
          <Grid item>
            <Grid item>
              <TownBuildingsButton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <TownVillagers />
    </Container>
  );
};
