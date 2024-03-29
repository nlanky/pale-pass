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
import { Image, NineSlice } from "features/common/components";
// Constants
import { RESOURCE_TO_IMAGE } from "features/resource/constants";
import { TOWN_RESOURCE_ITEM_HEIGHT } from "features/town/constants";
// Hooks
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectEnabledResources } from "features/tier/selectors";
import {
  selectTownResources,
  selectTownResourcesPerDay,
} from "features/town/selectors";
// Utility functions
import { getRpdColour } from "features/resource/utils";

interface TownResourcesProps {
  hideRpd?: boolean;
}

export const TownResources: FC<TownResourcesProps> = ({
  hideRpd = false,
}) => {
  // Hooks
  const theme = useTheme();
  const resources = useAppSelector(selectTownResources);
  const resourcesPerDay = useAppSelector(selectTownResourcesPerDay);
  const enabledResources = useAppSelector(selectEnabledResources);

  return (
    <NineSlice
      width={185}
      height={
        TOWN_RESOURCE_ITEM_HEIGHT * enabledResources.length +
        theme.gap(0.5) * (enabledResources.length - 1) +
        theme.gap(3) +
        16 // 2 * vertical border
      }
      borders={{
        horizontal: 8,
        vertical: 8,
      }}
      styles={{
        content: {
          padding: theme.spacing(1.5, 1),
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
                <Image
                  src={RESOURCE_TO_IMAGE[resource]}
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
                  sx={{ width: "auto" }}
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
                    {rpd}
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
