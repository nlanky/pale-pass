// REACT
import type { FC } from "react";

// PUBLiC MODULES
import { Grid, Typography, useTheme } from "@mui/material";

// LOCAL FILES
// Components
import { ResourceOutcomeIcon } from "features/resource/components";
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
  // Hooks
  const theme = useTheme();

  // Derived variables
  const positiveResources: Partial<Record<Resource, number>> = {};
  const negativeResources: Partial<Record<Resource, number>> = {};
  const positiveRpt: Partial<Record<Resource, number>> = {};
  const negativeRpt: Partial<Record<Resource, number>> = {};
  const buildingsAdded: string[] = [];
  const buildingsRemoved: string[] = [];
  const villagersAdded: string[] = [];
  const villagersRemoved: string[] = [];

  for (const resource in outcome.resources) {
    const resourceAmount = outcome.resources[resource as Resource];
    if (resourceAmount > 0) {
      positiveResources[resource as Resource] = resourceAmount;
    } else if (resourceAmount < 0) {
      negativeResources[resource as Resource] = resourceAmount;
    }
  }

  for (const resource in outcome.resourcesPerTurn) {
    const resourceAmount =
      outcome.resourcesPerTurn[resource as Resource];
    if (resourceAmount > 0) {
      positiveRpt[resource as Resource] = resourceAmount;
    } else if (resourceAmount < 0) {
      negativeRpt[resource as Resource] = resourceAmount;
    }
  }

  if (outcome.building) {
    if (outcome.building.add) {
      buildingsAdded.push(ID_TO_BUILDING[outcome.building.id].name);
    } else {
      buildingsRemoved.push(ID_TO_BUILDING[outcome.building.id].name);
    }
  }

  if (outcome.villager) {
    if (outcome.villager.add) {
      villagersAdded.push(ID_TO_VILLAGER[outcome.villager.id].name);
    } else {
      villagersRemoved.push(ID_TO_VILLAGER[outcome.villager.id].name);
    }
  }

  const showPositiveOutcomes =
    Object.keys(positiveResources).length !== 0 ||
    Object.keys(positiveRpt).length !== 0 ||
    buildingsAdded.length !== 0 ||
    villagersAdded.length !== 0;
  const showNegativeOutcomes =
    Object.keys(negativeResources).length !== 0 ||
    Object.keys(negativeRpt).length !== 0 ||
    buildingsRemoved.length !== 0 ||
    villagersRemoved.length !== 0;

  return (
    <Grid container sx={{ marginTop: theme.spacing(1) }}>
      {showPositiveOutcomes && (
        <Grid
          container
          item
          sx={{ color: theme.palette.success.main }}
          xs={6}
        >
          {Object.keys(positiveResources).map((resource) => (
            <Grid
              key={`resource_positive_${resource}`}
              alignItems="center"
              container
              item
              xs={6}
            >
              <ResourceOutcomeIcon
                resource={resource as Resource}
                outcome="positive"
              />
              <Typography variant="body2">
                +{positiveResources[resource as Resource]} {resource}
              </Typography>
            </Grid>
          ))}
          {Object.keys(positiveRpt).map((resource) => (
            <Grid
              key={`rpt_positive_${resource}`}
              alignItems="center"
              container
              item
              xs={6}
            >
              <ResourceOutcomeIcon
                resource={resource as Resource}
                outcome="positive"
              />
              <Typography
                sx={{ marginLeft: theme.spacing(1) }}
                variant="body2"
              >
                +{positiveRpt[resource as Resource]} {resource} per
                turn
              </Typography>
            </Grid>
          ))}
          {buildingsAdded.map((building) => (
            <Grid
              key={`building_positive_${building}`}
              alignItems="center"
              container
              item
              xs={6}
            >
              <Typography variant="body2">
                {building} constructed
              </Typography>
            </Grid>
          ))}
          {villagersAdded.map((villager) => (
            <Grid
              key={`villager_positive_${villager}`}
              alignItems="center"
              container
              item
              xs={6}
            >
              <Typography variant="body2">
                {villager} arrives
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
      {showNegativeOutcomes && (
        <Grid
          container
          item
          sx={{ color: theme.palette.error.main }}
          xs={6}
        >
          {Object.keys(negativeResources).map((resource) => (
            <Grid
              key={`resource_negative_${resource}`}
              alignItems="center"
              container
              item
              xs={6}
            >
              <ResourceOutcomeIcon
                resource={resource as Resource}
                outcome="negative"
              />
              <Typography variant="body2">
                -{negativeResources[resource as Resource]} {resource}
              </Typography>
            </Grid>
          ))}
          {Object.keys(negativeRpt).map((resource) => (
            <Grid
              key={`rpt_negative_${resource}`}
              alignItems="center"
              container
              item
              xs={6}
            >
              <ResourceOutcomeIcon
                resource={resource as Resource}
                outcome="negative"
              />
              <Typography
                sx={{ marginLeft: theme.spacing(1) }}
                variant="body2"
              >
                -{negativeRpt[resource as Resource]} {resource} per
                turn
              </Typography>
            </Grid>
          ))}
          {buildingsRemoved.map((building) => (
            <Grid
              key={`building_negative_${building}`}
              alignItems="center"
              container
              item
              xs={6}
            >
              <Typography variant="body2">
                {building} destroyed
              </Typography>
            </Grid>
          ))}
          {villagersAdded.map((villager) => (
            <Grid
              key={`villager_negative_${villager}`}
              alignItems="center"
              container
              item
              xs={6}
            >
              <Typography variant="body2">
                {villager} leaves
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};
