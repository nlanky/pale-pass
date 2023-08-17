// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Container, Grid } from "@mui/material";

// LOCAL FILES
// Components
import { SpeedControls } from "features/system/components";
import {
  TownAdvanceTierButton,
  TownBuildingsButton,
  TownExploreButton,
  TownImage,
  TownLogButton,
  TownMapButton,
  TownResources,
  TownVillagersButton,
} from "features/town/components";
// Hooks
import { useEventTimer } from "features/event/hooks";
import { useDayTimer } from "features/system/hooks";
import {
  useBuildingNotifications,
  useVillagerNotifications,
} from "features/town/hooks";

export const TownView: FC<{}> = () => {
  // Hooks
  useDayTimer();
  useEventTimer();
  useBuildingNotifications();
  useVillagerNotifications();

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
            <SpeedControls />
          </Grid>
          <Grid item>
            <TownExploreButton />
          </Grid>
          <Grid item>
            <TownAdvanceTierButton />
          </Grid>
          <Grid item>
            <TownBuildingsButton />
          </Grid>
          <Grid item>
            <TownVillagersButton />
          </Grid>
          <Grid item>
            <TownMapButton />
          </Grid>
          <Grid item>
            <TownLogButton />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
