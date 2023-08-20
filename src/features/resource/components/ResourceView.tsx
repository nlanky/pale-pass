// REACT
import type { FC } from "react";

// PUBLIC MODULES
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  type TableCellProps,
  TableHead,
  TableRow,
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

interface ResourceTableCellProps extends TableCellProps {
  value: number;
}

const ResourceTableCell: FC<ResourceTableCellProps> = ({
  value,
  sx,
  ...rest
}) => {
  // Derived variables
  let text = "-";
  let color = "text.primary";
  if (value > 0) {
    text = `+ ${value}`;
    color = "success.dark";
  } else if (value < 0) {
    text = `- ${Math.abs(value)}`;
    color = "error.main";
  }

  return (
    <TableCell sx={{ color, ...sx }} {...rest}>
      {text}
    </TableCell>
  );
};

export const ResourceView: FC<{}> = () => {
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

      <Divider sx={{ mt: 1 }} />

      <Grid
        container
        direction="column"
        item
        sx={{
          height: `calc(100% - ${BUTTON_HEIGHT}px - ${TOWN_RESOURCE_ITEM_HEIGHT}px - ${theme.spacing(
            2,
          )} - 1px)`,
          overflowY: "auto",
        }}
        wrap="nowrap"
      >
        <TableContainer>
          <Table padding="checkbox">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Details</TableCell>
                {enabledResources.map((resource) => (
                  <TableCell key={resource}>
                    <Image
                      src={RESOURCE_TO_IMAGE[resource]}
                      width={24}
                      height={24}
                      style={{ verticalAlign: "middle" }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* BASE FROM TIER */}
              <TableRow>
                <TableCell>Base</TableCell>
                <TableCell>Tier {townTier}</TableCell>
                {enabledResources.map((resource) => (
                  <ResourceTableCell
                    key={resource}
                    value={tierResourcesPerDay[resource]}
                  />
                ))}
              </TableRow>

              {/* BUILDINGS */}
              {townBuildings.map((townBuilding) => {
                const { id, state } = townBuilding;
                const { name, gatherResources } = ID_TO_BUILDING[id];
                const isBuilt = state === "built";

                return (
                  <TableRow
                    key={id}
                    sx={{
                      backgroundColor: isBuilt
                        ? "none"
                        : "action.disabled",
                    }}
                  >
                    <TableCell>Building</TableCell>
                    <TableCell>
                      <Grid alignItems="center" container>
                        <BuildingAvatar
                          buildingId={id}
                          hideStateOverlay
                          hideStateText
                          width={32}
                          height={32}
                        />
                        <Typography sx={{ ml: 1 }} variant="body2">
                          {name} ({state})
                        </Typography>
                      </Grid>
                    </TableCell>
                    {enabledResources.map((resource) => (
                      <ResourceTableCell
                        key={resource}
                        value={
                          isBuilt ? gatherResources[resource] : 0
                        }
                      />
                    ))}
                  </TableRow>
                );
              })}

              {/* VILLAGERS */}
              {townVillagers.map((townVillager) => {
                const { id, state } = townVillager;
                const { name, gatherResources } = ID_TO_VILLAGER[id];
                const isHealthy = state === "healthy";

                return (
                  <TableRow
                    key={id}
                    sx={{
                      backgroundColor: isHealthy
                        ? "none"
                        : "action.disabled",
                    }}
                  >
                    <TableCell>Villager</TableCell>
                    <TableCell>
                      <Grid alignItems="center" container>
                        <VillagerAvatar
                          villagerId={id}
                          hideStateOverlay
                          hideStateText
                          width={32}
                          height={32}
                        />
                        <Typography sx={{ ml: 1 }} variant="body2">
                          {name} ({state})
                        </Typography>
                      </Grid>
                    </TableCell>
                    {enabledResources.map((resource) => (
                      <ResourceTableCell
                        key={resource}
                        value={
                          isHealthy ? gatherResources[resource] : 0
                        }
                      />
                    ))}
                  </TableRow>
                );
              })}

              {/* EVENTS */}
              {completedEvents.map((completedEvent) => {
                const { id, choiceIndex, outcomeIndex } =
                  completedEvent;
                const { resourcesPerDay } =
                  ID_TO_EVENT[id].choices[choiceIndex].outcomes[
                    outcomeIndex
                  ];

                return (
                  <TableRow key={id}>
                    <TableCell>Event</TableCell>
                    <TableCell>{id}</TableCell>
                    {enabledResources.map((resource) => (
                      <ResourceTableCell
                        key={resource}
                        value={resourcesPerDay[resource]}
                      />
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </StyledContainer>
  );
};
