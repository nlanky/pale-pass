// REACT
import type { FC, ReactNode } from "react";

// PUBLiC MODULES
import { Grid } from "@mui/material";

// LOCAL FILES
// Components
import {
  OutcomeIconWithText,
  PlaceholderText,
} from "features/common/components";
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { RESOURCE_TO_ICON } from "features/resource/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type { Outcome } from "features/event/types";
import type { Resource } from "features/resource/types";

interface EventOutcomeProps {
  outcome: Outcome;
}

export const EventOutcome: FC<EventOutcomeProps> = ({ outcome }) => {
  // Derived variables
  const outcomeJsx: ReactNode[] = [];
  for (const resource in outcome.resources) {
    const resourceAmount = outcome.resources[resource as Resource];
    if (resourceAmount !== 0) {
      const isPositive = resourceAmount > 0;
      const iconText = `${
        isPositive ? "+ " : ""
      }${resourceAmount} ${resource}`;
      outcomeJsx.push(
        <OutcomeIconWithText
          key={`resource_${resource}`}
          icon={RESOURCE_TO_ICON[resource as Resource]}
          isPositive={isPositive}
          text={iconText}
        />,
      );
    }
  }

  for (const resource in outcome.resourcesPerDay) {
    const resourceAmount =
      outcome.resourcesPerDay[resource as Resource];
    if (resourceAmount !== 0) {
      const isPositive = resourceAmount > 0;
      const iconText = `${
        isPositive ? "+ " : ""
      }${resourceAmount} ${resource} per day`;
      outcomeJsx.push(
        <OutcomeIconWithText
          key={`rpd_${resource}`}
          icon={RESOURCE_TO_ICON[resource as Resource]}
          isPositive={isPositive}
          text={iconText}
        />,
      );
    }
  }

  outcome.buildings.forEach((outcomeBuilding) => {
    const { id, state } = outcomeBuilding;
    const { name, icons } = ID_TO_BUILDING[id];
    const isPositive = [
      "built",
      "under construction",
      "being repaired",
    ].includes(state);
    outcomeJsx.push(
      <OutcomeIconWithText
        key={`building_${id}`}
        icon={icons[state]}
        isPositive={isPositive}
        text={`${name} ${state}`}
      />,
    );
  });

  outcome.villagers.forEach((outcomeVillager) => {
    const { id, state } = outcomeVillager;
    const { name, occupation, icons } = ID_TO_VILLAGER[id];
    const isPositive = ["healthy", "recovering"].includes(state);
    outcomeJsx.push(
      <OutcomeIconWithText
        key={`villager_${id}`}
        icon={icons[state]}
        isPositive={isPositive}
        text={`${name} the ${occupation} ${
          state === "healthy" ? "joins the town" : `is ${state}`
        }`}
      />,
    );
  });

  return (
    <Grid container direction="column" sx={{ mt: 1 }}>
      <PlaceholderText
        sx={{
          mb: outcomeJsx.length === 0 ? 0 : 1,
        }}
        text={outcome.text}
        variant="body2"
      />
      <Grid container spacing={1}>
        {outcomeJsx}
      </Grid>
    </Grid>
  );
};
