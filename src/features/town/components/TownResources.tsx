// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Stack, Tooltip, Typography } from "@mui/material";
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
  showRpd?: boolean;
}

export const TownResources: FC<TownResourcesProps> = ({
  showRpd = true,
}) => {
  // Hooks
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
      return "success.main";
    }

    if (rpd < 0) {
      return "error.main";
    }

    return "text.primary";
  };

  return (
    <StyledPaper>
      {resourceNames.map((resource, index) => {
        const rpd = resourcesPerDay[resource];

        return (
          <Stack
            key={resource}
            alignItems="center"
            direction="row"
            justifyContent="space-around"
            sx={{ pt: index !== 0 ? 0.5 : 0 }}
          >
            <Tooltip
              title={
                <Typography variant="body2">{resource}</Typography>
              }
            >
              <img
                src={RESOURCE_TO_ICON[resource]}
                style={{ width: 32, height: 32 }}
              />
            </Tooltip>
            <Typography variant="body2">
              {resources[resource]}
            </Typography>
            {showRpd && (
              <Stack alignItems="center" direction="row">
                {rpd > 0 && (
                  <ArrowUpward color="success" fontSize="small" />
                )}
                {rpd === 0 && <Remove fontSize="small" />}
                {rpd < 0 && (
                  <ArrowDownward color="error" fontSize="small" />
                )}
                <Typography color={getRpdColour(rpd)} variant="body2">
                  {resourcesPerDay[resource]}
                </Typography>
              </Stack>
            )}
          </Stack>
        );
      })}
    </StyledPaper>
  );
};
