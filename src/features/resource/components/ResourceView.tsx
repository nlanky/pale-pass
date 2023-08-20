// PUBLIC MODULES
import {
  Divider,
  Grid,
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
import { BuildingAvatar } from "features/building/components";
import {
  Image,
  ReturnToTownButton,
  StyledContainer,
} from "features/common/components";
import { ResourceOutcomeIcon } from "features/resource/components";
import { VillagerAvatar } from "features/villager/components";
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { BUTTON_HEIGHT } from "features/common/constants";
import { ID_TO_EVENT } from "features/event/constants";
import { RESOURCE_TO_IMAGE } from "features/resource/constants";
import { TOWN_RESOURCE_ITEM_HEIGHT } from "features/town/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Hooks
import { useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import {
  selectEnabledResources,
  selectTierResourcesPerDay,
  selectTownTier,
} from "features/tier/selectors";
import {
  selectSortedCompletedEvents,
  selectSortedTownBuildings,
  selectSortedTownVillagers,
  selectTownResources,
  selectTownResourcesPerDay,
} from "features/town/selectors";
// Utility functions
import { getRpdColour } from "features/resource/utils";

export const ResourceView = () => {
  // Hooks
  const theme = useTheme();
  const enabledResources = useAppSelector(selectEnabledResources);
  const townResources = useAppSelector(selectTownResources);
  const townResourcesPerDay = useAppSelector(
    selectTownResourcesPerDay,
  );
  const townTier = useAppSelector(selectTownTier);
  const tierResourcesPerDay = useAppSelector(
    selectTierResourcesPerDay,
  );
  const townBuildings = useAppSelector(selectSortedTownBuildings);
  const townVillagers = useAppSelector(selectSortedTownVillagers);
  const completedEvents = useAppSelector(selectSortedCompletedEvents);

  return (
    <StyledContainer>
      <Grid item>
        <ReturnToTownButton />
      </Grid>

      <Grid
        alignItems="center"
        container
        item
        sx={{ mt: 1 }}
        wrap="nowrap"
      >
        {enabledResources.map((resource) => {
          const rpd = townResourcesPerDay[resource];

          return (
            <Grid
              key={resource}
              alignItems="center"
              container
              item
              xs={2}
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
              <Typography sx={{ ml: 1 }} variant="body2">
                {townResources[resource]}
              </Typography>
              <Grid
                alignItems="center"
                container
                item
                sx={{ ml: 1, width: "auto" }}
              >
                {rpd > 0 && (
                  <ArrowUpward color="success" fontSize="small" />
                )}
                {rpd === 0 && <Remove fontSize="small" />}
                {rpd < 0 && (
                  <ArrowDownward color="error" fontSize="small" />
                )}
                <Typography color={getRpdColour(rpd)} variant="body2">
                  {rpd}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      <Divider sx={{ my: 1 }} />

      <Grid
        container
        direction="column"
        item
        sx={{
          height: `calc(100% - ${BUTTON_HEIGHT}px - ${TOWN_RESOURCE_ITEM_HEIGHT}px - ${theme.spacing(
            3,
          )} - 1px)`,
          overflowY: "auto",
        }}
        wrap="nowrap"
      >
        <Grid container direction="column" item>
          <Typography component="h3" sx={{ mb: 1 }} variant="h6">
            Base Gather Rates (Tier {townTier})
          </Typography>

          <Grid container item>
            {(Object.keys(tierResourcesPerDay) as Resource[])
              .filter(
                (resource) => tierResourcesPerDay[resource] !== 0,
              )
              .map((resource) => {
                const isPositive = tierResourcesPerDay[resource] > 0;
                const text = `${isPositive ? "+ " : ""}${
                  tierResourcesPerDay[resource]
                } ${resource} per day`;

                return (
                  <ResourceOutcomeIcon
                    key={resource}
                    resource={resource}
                    isPositive={isPositive}
                    text={text}
                    styles={{
                      container: {
                        mr: 1,
                        mb: 1,
                      },
                    }}
                  />
                );
              })}
          </Grid>
        </Grid>

        {townBuildings.length !== 0 && (
          <>
            <Divider sx={{ my: 1 }} />

            <Grid container direction="column" item>
              <Typography component="h3" sx={{ mb: 1 }} variant="h6">
                Buildings
              </Typography>

              {townBuildings.map((townBuilding) => {
                const { id, state } = townBuilding;
                const { name, gatherResources } = ID_TO_BUILDING[id];

                return (
                  <Grid
                    key={townBuilding.id}
                    alignItems="center"
                    container
                    item
                    sx={{ mb: 1 }}
                  >
                    <BuildingAvatar
                      buildingId={townBuilding.id}
                      hideStateText
                      hideStateOverlay
                      width={64}
                      height={64}
                    />

                    <Typography sx={{ ml: 1 }} variant="body2">
                      {name} ({state})
                    </Typography>

                    {(Object.keys(gatherResources) as Resource[])
                      .filter(
                        (resource) => gatherResources[resource] !== 0,
                      )
                      .map((resource) => {
                        const isPositive =
                          gatherResources[resource] > 0;
                        const text = `${isPositive ? "+ " : ""}${
                          gatherResources[resource]
                        } ${resource} per day`;

                        return (
                          <ResourceOutcomeIcon
                            key={resource}
                            resource={resource}
                            isPositive={isPositive}
                            text={text}
                            disabled={state !== "built"}
                            styles={{
                              container: {
                                ml: 1,
                              },
                            }}
                          />
                        );
                      })}
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}

        {townVillagers.length !== 0 && (
          <>
            <Divider sx={{ my: 1 }} />

            <Grid container direction="column" item>
              <Typography component="h3" sx={{ mb: 1 }} variant="h6">
                Villagers
              </Typography>

              {townVillagers.map((townVillager) => {
                const { id, state } = townVillager;
                const { name, gatherResources } = ID_TO_VILLAGER[id];

                return (
                  <Grid
                    key={townVillager.id}
                    alignItems="center"
                    container
                    item
                    sx={{ mb: 1 }}
                  >
                    <VillagerAvatar
                      villagerId={townVillager.id}
                      width={64}
                      height={64}
                      hideStateText
                    />

                    <Typography sx={{ ml: 1 }} variant="body2">
                      {name} ({state})
                    </Typography>

                    {(Object.keys(gatherResources) as Resource[])
                      .filter(
                        (resource) => gatherResources[resource] !== 0,
                      )
                      .map((resource) => {
                        const isPositive =
                          gatherResources[resource] > 0;
                        const text = `${isPositive ? "+ " : ""}${
                          gatherResources[resource]
                        } ${resource} per day`;

                        return (
                          <ResourceOutcomeIcon
                            key={resource}
                            resource={resource}
                            isPositive={gatherResources[resource] > 0}
                            text={text}
                            disabled={state !== "healthy"}
                            styles={{
                              container: {
                                ml: 1,
                              },
                            }}
                          />
                        );
                      })}
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}

        {completedEvents.length !== 0 && (
          <>
            <Divider sx={{ my: 1 }} />

            <Grid container direction="column" item>
              <Typography component="h3" sx={{ mb: 1 }} variant="h6">
                Events
              </Typography>

              {completedEvents.map((completedEvent) => {
                const { id, choiceIndex, outcomeIndex } =
                  completedEvent;
                const { resourcesPerDay } =
                  ID_TO_EVENT[id].choices[choiceIndex].outcomes[
                    outcomeIndex
                  ];
                const changedResources = (
                  Object.keys(resourcesPerDay) as Resource[]
                ).filter(
                  (resource) => resourcesPerDay[resource] !== 0,
                );

                return (
                  <Grid
                    key={id}
                    alignItems="center"
                    container
                    item
                    sx={{ mb: 1 }}
                  >
                    <Typography sx={{ ml: 1 }} variant="body2">
                      {id}
                    </Typography>

                    {changedResources.length === 0 && (
                      <Typography sx={{ ml: 1 }} variant="body2">
                        No resources gained or lost per day
                      </Typography>
                    )}

                    {changedResources.map((resource) => {
                      const isPositive =
                        resourcesPerDay[resource] > 0;
                      const text = `${isPositive ? "+ " : ""}${
                        resourcesPerDay[resource]
                      } ${resource} per day`;

                      return (
                        <ResourceOutcomeIcon
                          key={resource}
                          resource={resource}
                          isPositive={resourcesPerDay[resource] > 0}
                          text={text}
                          styles={{
                            container: {
                              ml: 1,
                            },
                          }}
                        />
                      );
                    })}
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </Grid>
    </StyledContainer>
  );
};
