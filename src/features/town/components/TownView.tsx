// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Container, Grid, useTheme } from "@mui/material";

// LOCAL FILES
// Components
import {
  TownAdvanceTierButton,
  TownBuildings,
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
  const theme = useTheme();
  useTurnTimer();
  useEventTimer();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <TownImage />
        </Grid>
        <Grid item xs={3}>
          <TownResources />
          <Grid
            container
            direction="column"
            spacing={1}
            sx={{ paddingTop: theme.spacing(1) }}
          >
            <Grid item>
              <TownExploreButton />
            </Grid>
            <Grid item>
              <TownAdvanceTierButton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <TownBuildings />
      <TownVillagers />
    </Container>
  );
};
