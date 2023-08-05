// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Tooltip, Typography, useTheme } from "@mui/material";
import {
  ArrowDownward,
  ArrowUpward,
  Remove,
} from "@mui/icons-material";

// LOCAL FILES
// Components
import { NineSlice } from "features/common/components";
// Constants
import { RESOURCE_TO_ICON } from "features/resource/constants";
import { TOWN_RESOURCE_ITEM_HEIGHT } from "features/town/constants";
// Redux
import { useAppSelector } from "features/redux/hooks";
import {
  selectCombinedTownResourcesPerDay,
  selectEnabledResources,
  selectTownResources,
} from "features/town/townSlice";

interface TownResourcesProps {
  hideRpd?: boolean;
}

export const TownResources: FC<TownResourcesProps> = ({
  hideRpd = false,
}) => {
  // Hooks
  const theme = useTheme();
  const resources = useAppSelector(selectTownResources);
  const resourcesPerDay = useAppSelector(
    selectCombinedTownResourcesPerDay,
  );
  const enabledResources = useAppSelector(selectEnabledResources);

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
    <NineSlice
      width={185}
      height={
        TOWN_RESOURCE_ITEM_HEIGHT * enabledResources.length +
        theme.gap(0.5) * (enabledResources.length - 1) +
        theme.gap(4)
      }
      styles={{
        content: {
          padding: theme.spacing(2, 1),
        },
      }}
    >
      <Grid container direction="column" wrap="nowrap">
        {enabledResources.map((resource, index) => {
          const rpd = resourcesPerDay[resource];

          return (
            <Grid
              key={resource}
              alignItems="center"
              container
              item
              justifyContent="space-around"
              sx={{
                pt: index !== 0 ? 0.5 : 0,
              }}
              wrap="nowrap"
            >
              <Tooltip
                title={
                  <Typography variant="body2">{resource}</Typography>
                }
              >
                <img
                  src={RESOURCE_TO_ICON[resource]}
                  style={{
                    width: TOWN_RESOURCE_ITEM_HEIGHT,
                    height: TOWN_RESOURCE_ITEM_HEIGHT,
                  }}
                />
              </Tooltip>
              <Typography variant="body2">
                {resources[resource]}
              </Typography>
              {!hideRpd && (
                <Grid
                  alignItems="center"
                  container
                  item
                  style={{ width: "auto" }}
                >
                  {rpd > 0 && (
                    <ArrowUpward color="success" fontSize="small" />
                  )}
                  {rpd === 0 && <Remove fontSize="small" />}
                  {rpd < 0 && (
                    <ArrowDownward color="error" fontSize="small" />
                  )}
                  <Typography
                    color={getRpdColour(rpd)}
                    variant="body2"
                  >
                    {resourcesPerDay[resource]}
                  </Typography>
                </Grid>
              )}
            </Grid>
          );
        })}
      </Grid>
    </NineSlice>
  );
};
