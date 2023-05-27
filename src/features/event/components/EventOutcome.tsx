// REACT
import type { FC } from "react";

// PUBLiC MODULES
import { Grid, Typography, useTheme } from "@mui/material";

// LOCAL FILES
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
        <Grid item sx={{ color: theme.palette.success.main }} xs={6}>
          {Object.keys(positiveResources).map((resource) => (
            <Typography key={resource} variant="body2">
              +{positiveResources[resource as Resource]} {resource}
            </Typography>
          ))}
          {Object.keys(positiveRpt).map((resource) => (
            <Typography key={resource} variant="body2">
              +{positiveRpt[resource as Resource]} {resource} per turn
            </Typography>
          ))}
          {buildingsAdded.map((building) => (
            <Typography key={building} variant="body2">
              {building} constructed
            </Typography>
          ))}
          {villagersAdded.map((villager) => (
            <Typography key={villager} variant="body2">
              {villager} arrives
            </Typography>
          ))}
        </Grid>
      )}
      {showNegativeOutcomes && (
        <Grid item sx={{ color: theme.palette.error.main }} xs={6}>
          {Object.keys(negativeResources).map((resource) => (
            <Typography key={resource} variant="body2">
              -{negativeResources[resource as Resource]} {resource}
            </Typography>
          ))}
          {Object.keys(negativeRpt).map((resource) => (
            <Typography key={resource} variant="body2">
              -{negativeRpt[resource as Resource]} {resource} per turn
            </Typography>
          ))}
          {buildingsRemoved.map((building) => (
            <Typography key={building} variant="body2">
              {building} destroyed
            </Typography>
          ))}
          {villagersRemoved.map((villager) => (
            <Typography key={villager} variant="body2">
              {villager} leaves
            </Typography>
          ))}
        </Grid>
      )}
    </Grid>
  );
};
