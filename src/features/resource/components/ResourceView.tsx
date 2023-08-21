// REACT
import { type FC, type ReactNode, useMemo, useState } from "react";

// PUBLIC MODULES
import {
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  type TableCellProps,
  TableHead,
  TableRow,
  TableSortLabel,
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
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import {
  selectEnabledResources,
  selectTierResourcesPerDay,
  selectTownTier,
} from "features/tier/selectors";
import {
  selectCompletedEvents,
  selectTownBuildings,
  selectTownResources,
  selectTownResourcesPerDay,
  selectTownVillagers,
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

interface TableData extends Record<Resource, number> {
  id: string;
  type: "Base" | "Building" | "Villager" | "Event";
  details: ReactNode;
  disabled: boolean;
}
type OrderBy = "type" | Resource;
type Order = "asc" | "desc";

const descendingComparator = (
  a: TableData,
  b: TableData,
  orderBy: OrderBy,
) => {
  const aValue = orderBy !== "type" && a.disabled ? 0 : a[orderBy];
  const bValue = orderBy !== "type" && b.disabled ? 0 : b[orderBy];

  if (bValue < aValue) {
    return -1;
  }

  if (bValue > aValue) {
    return 1;
  }

  return a.type.localeCompare(b.type);
};

const getComparator = (
  order: Order,
  orderBy: OrderBy,
): ((a: TableData, b: TableData) => number) =>
  order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

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
  const townBuildings = useAppSelector(selectTownBuildings);
  const townVillagers = useAppSelector(selectTownVillagers);
  const completedEvents = useAppSelector(selectCompletedEvents);

  // Local state
  const [orderBy, setOrderBy] = useState<OrderBy>("type");
  const [order, setOrder] = useState<Order>("asc");

  // Handlers
  const handleRequestSort = (column: OrderBy) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  // Memoised variables
  const tableData = useMemo<TableData[]>(() => {
    const nextTableData: TableData[] = [
      {
        id: "base",
        type: "Base",
        details: `Tier ${townTier}`,
        disabled: false,
        ...tierResourcesPerDay,
      },
    ];

    townBuildings.forEach((townBuilding) => {
      const { id, state } = townBuilding;
      const { name, gatherResources } = ID_TO_BUILDING[id];
      const isBuilt = state === "built";

      nextTableData.push({
        id: `building_${id}`,
        type: "Building",
        details: (
          <Grid alignItems="center" container wrap="nowrap">
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
        ),
        disabled: !isBuilt,
        ...gatherResources,
      });
    });

    townVillagers.forEach((townVillager) => {
      const { id, state } = townVillager;
      const { name, gatherResources } = ID_TO_VILLAGER[id];
      const isHealthy = state === "healthy";

      nextTableData.push({
        id: `villager_${id}`,
        type: "Villager",
        details: (
          <Grid alignItems="center" container wrap="nowrap">
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
        ),
        disabled: !isHealthy,
        ...gatherResources,
      });
    });

    completedEvents.forEach((completedEvent) => {
      const { id, choiceIndex, outcomeIndex } = completedEvent;
      const { resourcesPerDay } =
        ID_TO_EVENT[id].choices[choiceIndex].outcomes[outcomeIndex];

      nextTableData.push({
        id: `event_${id}`,
        type: "Event",
        details: id,
        disabled: false,
        ...resourcesPerDay,
      });
    });

    return nextTableData.slice().sort(getComparator(order, orderBy));
  }, [
    townTier,
    tierResourcesPerDay,
    townBuildings,
    townVillagers,
    completedEvents,
    order,
    orderBy,
  ]);

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

      <Grid
        container
        direction="column"
        item
        sx={{
          height: `calc(100% - ${BUTTON_HEIGHT}px - ${TOWN_RESOURCE_ITEM_HEIGHT}px - ${theme.spacing(
            2,
          )})`,
          mt: 1,
          overflowY: "auto",
        }}
        wrap="nowrap"
      >
        <TableContainer>
          <Table padding="checkbox" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sortDirection={orderBy === "type" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "type"}
                    direction={orderBy === "type" ? order : "asc"}
                    onClick={() => {
                      handleRequestSort("type");
                    }}
                  >
                    Type
                  </TableSortLabel>
                </TableCell>
                <TableCell>Details</TableCell>
                {enabledResources.map((resource) => (
                  <TableCell key={resource}>
                    <TableSortLabel
                      active={orderBy === resource}
                      direction={orderBy === resource ? order : "asc"}
                      onClick={() => {
                        handleRequestSort(resource);
                      }}
                    >
                      <Image
                        src={RESOURCE_TO_IMAGE[resource]}
                        width={24}
                        height={24}
                        style={{ verticalAlign: "middle" }}
                      />
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((data) => (
                <TableRow
                  key={data.id}
                  sx={{
                    backgroundColor: data.disabled
                      ? "action.disabled"
                      : "none",
                  }}
                >
                  <TableCell>{data.type}</TableCell>
                  <TableCell>{data.details}</TableCell>
                  {enabledResources.map((resource) => (
                    <ResourceTableCell
                      key={resource}
                      value={data.disabled ? 0 : data[resource]}
                    />
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </StyledContainer>
  );
};
