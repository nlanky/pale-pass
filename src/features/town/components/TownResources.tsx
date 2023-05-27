// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Icon, Typography, useTheme } from "@mui/material";
import {
  ArrowDownward,
  ArrowUpward,
  Remove,
} from "@mui/icons-material";

// LOCAL FILES
// Components
import { StyledPaper } from "features/common/components";
// Constants
import { RESOURCE_TO_ICON } from "features/resource/constants";
// Hooks
import { usePlayerResourcesPerTurn } from "features/resource/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { useAppSelector } from "features/redux/hooks";
import {
  selectEnabledResources,
  selectPlayerResources,
} from "features/town/townSlice";

export const TownResources: FC<{}> = () => {
  // Hooks
  const theme = useTheme();
  const resources = useAppSelector(selectPlayerResources);
  const resourcesPerTurn = usePlayerResourcesPerTurn();
  const enabledResources = useAppSelector(selectEnabledResources);

  // Derived variables
  const resourceNames = (Object.keys(resources) as Resource[]).filter(
    (resource) => enabledResources.includes(resource),
  );

  // Utility functions
  const getRptColour = (rpt: number): string => {
    if (rpt > 0) {
      return theme.palette.success.main;
    }

    if (rpt < 0) {
      return theme.palette.error.main;
    }

    return theme.palette.text.primary;
  };

  return (
    <StyledPaper>
      {resourceNames.map((resource, index) => {
        const rpt = resourcesPerTurn[resource];

        return (
          <Grid
            key={resource}
            alignItems="center"
            container
            spacing={2}
            sx={{ paddingTop: index !== 0 ? theme.spacing(1) : 0 }}
          >
            <Grid item>
              <img
                src={RESOURCE_TO_ICON[resource]}
                style={{ width: 32, height: 32 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="body2">{resource}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {resources[resource]}
              </Typography>
            </Grid>
            <Grid alignItems="center" container item xs>
              <Icon>
                {rpt > 0 && <ArrowUpward color="success" />}
                {rpt === 0 && <Remove />}
                {rpt < 0 && <ArrowDownward color="error" />}
              </Icon>
              <Typography color={getRptColour(rpt)} variant="body2">
                {resourcesPerTurn[resource]}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </StyledPaper>
  );
};
