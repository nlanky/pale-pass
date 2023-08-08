// REACT
import type { FC, ReactNode } from "react";

// PUBLIC MODULES
import { Grid, Tooltip, Typography } from "@mui/material";

// LOCAL FILES
// Components
import { BuildingAvatar } from "features/building/components";
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
  const townBuilding = useAppSelector(selectTownBuilding(buildingId));

  // Derived variables
  const building = ID_TO_BUILDING[buildingId];
  const { id, name } = building;
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
        {resourceRequirementsJsx.length !== 0 && (
          <Typography sx={{ fontWeight: "bold" }} variant="body2">
            Resource requirements
          </Typography>
        )}
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

  return (
    <Tooltip title={getTooltipTitle(canBuild)}>
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
          backgroundColor: hoveringOnBuilding
            ? "action.hover"
            : "transparent",
          cursor: "pointer",
          p: 1,
          position: "relative",
          width: "auto",
        }}
      >
        <BuildingAvatar buildingId={buildingId} hideStateText />
        <Typography sx={{ mt: 1 }} variant="body2">
          {name}
        </Typography>
      </Grid>
    </Tooltip>
  );
};
