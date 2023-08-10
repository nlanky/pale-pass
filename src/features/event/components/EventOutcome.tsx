// REACT
import type { FC, ReactNode } from "react";

// PUBLiC MODULES
import { Grid } from "@mui/material";

// LOCAL FILES
// Components
import { BuildingOutcomeIcon } from "features/building/components";
import { PlaceholderText } from "features/common/components";
import { ResourceOutcomeIcon } from "features/resource/components";
import { VillagerOutcomeIcon } from "features/villager/components";
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
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
  (Object.keys(outcome.resources) as Resource[]).forEach(
    (resource) => {
      const resourceAmount = outcome.resources[resource];
      if (resourceAmount !== 0) {
        const isPositive = resourceAmount > 0;
        const iconText = `${
          isPositive ? "+ " : ""
        }${resourceAmount} ${resource}`;
        outcomeJsx.push(
          <ResourceOutcomeIcon
            key={`resource_${resource}`}
            resource={resource}
            isPositive={isPositive}
            text={iconText}
          />,
        );
      }
    },
  );

  (Object.keys(outcome.resourcesPerDay) as Resource[]).forEach(
    (resource) => {
      const resourceAmount = outcome.resourcesPerDay[resource];
      if (resourceAmount !== 0) {
        const isPositive = resourceAmount > 0;
        const iconText = `${
          isPositive ? "+ " : ""
        }${resourceAmount} ${resource} per day`;
        outcomeJsx.push(
          <ResourceOutcomeIcon
            key={`rpd_${resource}`}
            resource={resource}
            isPositive={isPositive}
            text={iconText}
          />,
        );
      }
    },
  );

  outcome.buildings.forEach((outcomeBuilding) => {
    const { id, state } = outcomeBuilding;
    const { name } = ID_TO_BUILDING[id];
    const isPositive = [
      "built",
      "under construction",
      "being repaired",
    ].includes(state);
    outcomeJsx.push(
      <BuildingOutcomeIcon
        key={`building_${id}`}
        buildingId={id}
        isPositive={isPositive}
        text={`${name} ${state}`}
      />,
    );
  });

  outcome.villagers.forEach((outcomeVillager) => {
    const { id, state } = outcomeVillager;
    const { name, occupation } = ID_TO_VILLAGER[id];
    const isPositive = ["healthy", "recovering"].includes(state);
    outcomeJsx.push(
      <VillagerOutcomeIcon
        key={`villager_${id}`}
        villagerId={id}
        isPositive={isPositive}
        text={`${name} the ${occupation} ${
          state === "healthy" ? "joins the town" : `is ${state}`
        }`}
      />,
    );
  });

  return (
    <Grid container direction="column">
      <PlaceholderText
        sx={{
          mb: outcomeJsx.length === 0 ? 0 : 1,
        }}
        text={outcome.text}
        variant="body2"
      />
      <Grid container spacing={1}>
        {outcomeJsx.map((outcome, index) => (
          <Grid key={index} item>
            {outcome}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
