// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Container, Grid } from "@mui/material";

// LOCAL FILES
// Components
import { TownBuildingsButton } from "features/building/components";
import { TownExploreButton } from "features/event/components";
import { TownLogButton } from "features/log/components";
import { TownMapButton } from "features/map/components";
import {
  TownResources,
  TownResourcesButton,
} from "features/resource/components";
import { SpeedControls } from "features/system/components";
import { TownAdvanceTierButton } from "features/tier/components";
import { TownImage } from "features/town/components";
import { TownVillagersButton } from "features/villager/components";
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
            <TownResourcesButton />
          </Grid>
          <Grid item>
            <TownLogButton />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
