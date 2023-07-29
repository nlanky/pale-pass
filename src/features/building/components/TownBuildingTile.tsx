// REACT
import type { FC, ReactNode } from "react";

// PUBLIC MODULES
import {
  Badge,
  Grid,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Construction as ConstructionIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

// LOCAL FILES
// Assets
import { buildingUnbuiltIcon } from "assets/building";
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Hooks
import { useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { selectTownBuilding } from "features/town/townSlice";

interface TownBuildingTileProps {
  buildingId: number;
  hoveringOnBuilding: boolean;
  onBuildingClick: (id: number) => void;
  onBuildingMouseEnter: (id: number) => void;
  onBuildingMouseLeave: () => void;
}

export const TownBuildingTile: FC<TownBuildingTileProps> = ({
  buildingId,
  hoveringOnBuilding,
  onBuildingClick,
  onBuildingMouseEnter,
  onBuildingMouseLeave,
}) => {
  // Hooks
  const theme = useTheme();
  const townBuilding = useAppSelector(selectTownBuilding(buildingId));

  // Derived variables
  const building = ID_TO_BUILDING[buildingId];
  const { id, name, icons } = building;
  const state = townBuilding?.state;
  const canBuild =
    (building.canBuild && townBuilding === undefined) ||
    state === "destroyed";

  // Utility functions
  const getTooltipTitle = (isBuild: boolean): ReactNode => {
    if (state === "built") {
      return "";
    }

    if (state === "under construction") {
      return (
        <Typography variant="body2">{`Under construction, ${townBuilding?.buildTimeRemaining} days remaining`}</Typography>
      );
    }

    if (state === "being repaired") {
      return (
        <Typography variant="body2">{`Being repaired, ${townBuilding?.repairTimeRemaining} days remaining`}</Typography>
      );
    }

    const resourcesRequired = isBuild
      ? building.buildResources
      : building.repairResources;
    const resourceRequirementsJsx = (
      Object.keys(resourcesRequired) as Resource[]
    )
      .filter((resource) => resourcesRequired[resource] !== 0)
      .map((resource) => (
        <Typography key={resource} variant="body2">
          {resource}: {Math.abs(resourcesRequired[resource])}
        </Typography>
      ));

    const buildingIdsRequired: number[] = isBuild
      ? building.requirements.buildingIds
      : [];
    const buildingRequirementsJsx = buildingIdsRequired.map(
      (buildingId) => (
        <Typography key={buildingId} variant="body2">
          {ID_TO_BUILDING[buildingId].name}
        </Typography>
      ),
    );

    const villagerIdsRequired: number[] = isBuild
      ? building.requirements.villagerIds
      : [];
    const villagerRequirementsJsx = villagerIdsRequired.map(
      (villagerId) => (
        <Typography key={villagerId} variant="body2">
          {ID_TO_VILLAGER[villagerId].name}
        </Typography>
      ),
    );

    if (
      resourceRequirementsJsx.length === 0 &&
      buildingRequirementsJsx.length === 0 &&
      villagerRequirementsJsx.length === 0
    ) {
      return "";
    }

    return (
      <Grid container direction="column">
        <Typography sx={{ fontWeight: "bold" }} variant="body2">
          Resource requirements
        </Typography>
        {resourceRequirementsJsx}
        {buildingIdsRequired.length !== 0 && (
          <>
            <Typography sx={{ fontWeight: "bold" }} variant="body2">
              Building requirements
            </Typography>
            {buildingRequirementsJsx}
          </>
        )}
        {villagerIdsRequired.length !== 0 && (
          <>
            <Typography sx={{ fontWeight: "bold" }} variant="body2">
              Villager requirements
            </Typography>
            {villagerRequirementsJsx}
          </>
        )}
      </Grid>
    );
  };

  const getBadgeContent = (): ReactNode => {
    switch (state) {
      case "being repaired":
        return (
          <>
            <ConstructionIcon />
            <Typography sx={{ ml: 0.25 }} variant="body1">
              {townBuilding?.repairTimeRemaining}
            </Typography>
          </>
        );
      case "damaged":
        return <ConstructionIcon />;
      case "destroyed":
        // TODO: Choose a better icon
        return <ErrorIcon />;
      case "under construction":
        return (
          <>
            <ConstructionIcon />
            <Typography sx={{ ml: 0.25 }} variant="body1">
              {townBuilding?.buildTimeRemaining}
            </Typography>
          </>
        );
      case "built":
      default:
        return null;
    }
  };

  return (
    <Tooltip title={getTooltipTitle(canBuild)}>
      <Badge badgeContent={getBadgeContent()} overlap="circular">
        <Grid
          alignItems="center"
          container
          direction="column"
          item
          onClick={() => {
            onBuildingClick(id);
          }}
          onMouseEnter={() => {
            onBuildingMouseEnter(id);
          }}
          onMouseLeave={() => {
            onBuildingMouseLeave();
          }}
          sx={{
            cursor: "pointer",
            position: "relative",
            width: "auto",
          }}
        >
          <img
            src={state ? icons[state] : buildingUnbuiltIcon}
            style={{ width: 128, height: 128 }}
          />
          <Typography variant="body2">{name}</Typography>
          {hoveringOnBuilding && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: `3px solid ${theme.palette.parchmentDark.main}`,
              }}
            />
          )}
        </Grid>
      </Badge>
    </Tooltip>
  );
};
