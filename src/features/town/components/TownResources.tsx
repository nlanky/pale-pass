// REACT
import type { FC } from "react";

// PUBLIC MODULES
import {
  Grid,
  Icon,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
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
import { usePlayerResourcesPerDay } from "features/resource/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { useAppSelector } from "features/redux/hooks";
import {
  selectEnabledResources,
  selectPlayerResources,
} from "features/town/townSlice";

interface TownResourcesProps {
  showRpt?: boolean;
}

export const TownResources: FC<TownResourcesProps> = ({
  showRpt = true,
}) => {
  // Hooks
  const theme = useTheme();
  const resources = useAppSelector(selectPlayerResources);
  const resourcesPerDay = usePlayerResourcesPerDay();
  const enabledResources = useAppSelector(selectEnabledResources);

  // Derived variables
  const resourceNames = (Object.keys(resources) as Resource[]).filter(
    (resource) => enabledResources.includes(resource),
  );

  // Utility functions
  const getRpdColour = (rpd: number): string => {
    if (rpd > 0) {
      return theme.palette.success.main;
    }

    if (rpd < 0) {
      return theme.palette.error.main;
    }

    return theme.palette.text.primary;
  };

  return (
    <StyledPaper>
      {resourceNames.map((resource, index) => {
        const rpd = resourcesPerDay[resource];

        return (
          <Grid
            key={resource}
            alignItems="center"
            container
            justifyContent="space-around"
            sx={{ paddingTop: index !== 0 ? theme.spacing(1) : 0 }}
          >
            <Tooltip
              title={
                <Typography variant="body2">{resource}</Typography>
              }
            >
              <Grid item>
                <img
                  src={RESOURCE_TO_ICON[resource]}
                  style={{ width: 32, height: 32 }}
                />
              </Grid>
            </Tooltip>
            <Grid item>
              <Typography variant="body2">
                {resources[resource]}
              </Typography>
            </Grid>
            {showRpt && (
              <Grid
                alignItems="center"
                container
                item
                sx={{ width: "auto" }}
              >
                <Icon>
                  {rpd > 0 && <ArrowUpward color="success" />}
                  {rpd === 0 && <Remove />}
                  {rpd < 0 && <ArrowDownward color="error" />}
                </Icon>
                <Typography color={getRpdColour(rpd)} variant="body2">
                  {resourcesPerDay[resource]}
                </Typography>
              </Grid>
            )}
          </Grid>
        );
      })}
    </StyledPaper>
  );
};
