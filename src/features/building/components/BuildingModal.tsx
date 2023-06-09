// REACT
import type { FC, ReactNode } from "react";

// PUBLIC MODULES
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { Construction as ConstructionIcon } from "@mui/icons-material";

// LOCAL FILES
// Components
import { MarketStall } from "features/building/components";
import {
  OutcomeIconWithText,
  PlaceholderText,
  StyledButton,
  StyledPaper,
} from "features/common/components";
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { RESOURCE_TO_ICON } from "features/resource/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import {
  closeModal,
  selectModalBuilding,
  selectModalTownBuilding,
} from "features/building/buildingSlice";
import {
  buildBuilding,
  repairBuilding,
  selectPlayerTown,
} from "features/town/townSlice";
// Utility functions
import { canBuildBuilding } from "features/building/utils";
import { canAffordResourceAmount } from "features/resource/utils";

export const BuildingModal: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const building = useAppSelector(selectModalBuilding);
  const townBuilding = useAppSelector(selectModalTownBuilding);
  const town = useAppSelector(selectPlayerTown);

  // Handlers
  const onModalClose = () => {
    dispatch(closeModal());
  };

  const onBuild = () => {
    dispatch(buildBuilding(building.id));
  };

  const onRepair = () => {
    dispatch(repairBuilding(building.id));
  };

  if (!building) {
    return null;
  }

  // Derived variables
  const isBuilt = townBuilding?.state === "built";
  const isBuilding = townBuilding?.state === "under construction";
  const isRepairing = townBuilding?.state === "being repaired";
  const isDamaged = townBuilding?.state === "damaged";
  const isDestroyed = townBuilding?.state === "destroyed";
  const isUnbuiltOrBuilding = !townBuilding || isBuilding;
  const canBuild =
    (building.canBuild && townBuilding === undefined) || isDestroyed;
  const canAffordRepair = canAffordResourceAmount(
    town.resources,
    building.repairResources,
  );
  const canAffordBuild = canBuildBuilding(town, building);
  const affectedResources = (
    Object.keys(building.gatherResources) as Resource[]
  ).filter((resource) => building.gatherResources[resource] !== 0);

  // Utility functions
  const getTooltipTitle = (isBuild: boolean): ReactNode => {
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

  return (
    <Dialog
      onClose={onModalClose}
      open={building !== undefined}
      PaperComponent={StyledPaper}
    >
      <DialogTitle>{building.name}</DialogTitle>

      <DialogContent>
        {isUnbuiltOrBuilding && (
          <PlaceholderText
            text={building.text.preBuild}
            variant="body2"
          />
        )}
        {!isUnbuiltOrBuilding && (
          <PlaceholderText
            text={building.text.postBuild}
            variant="body2"
          />
        )}

        {affectedResources.length !== 0 && (
          <>
            <Divider sx={{ mt: 1 }} />
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {affectedResources.map((resource) => {
                const amount = building.gatherResources[resource];
                const isPositive = amount > 0;
                const iconText = `${
                  isPositive ? "+ " : ""
                }${amount} ${resource}`;
                return (
                  <OutcomeIconWithText
                    key={resource}
                    icon={RESOURCE_TO_ICON[resource]}
                    isPositive={isPositive}
                    text={iconText}
                    disabled={!isBuilt}
                  />
                );
              })}
            </Grid>
          </>
        )}

        {isBuilding && (
          <>
            <Divider sx={{ mt: 1 }} />
            <Typography sx={{ mt: 1 }} variant="body2">
              {`Building in progress. Days remaining: ${townBuilding?.buildTimeRemaining}`}
            </Typography>
          </>
        )}

        {isRepairing && (
          <>
            <Divider sx={{ mt: 1 }} />
            <Typography sx={{ mt: 1 }} variant="body2">
              {`Repair in progress. Days remaining: ${townBuilding?.repairTimeRemaining}`}
            </Typography>
          </>
        )}

        {isBuilt && building.id === 42 && (
          <>
            <Divider sx={{ mt: 1 }} />
            <MarketStall />
          </>
        )}
      </DialogContent>

      {!(isBuilding || isRepairing) && (canBuild || isDamaged) && (
        <DialogActions>
          {canBuild && (
            <Tooltip title={getTooltipTitle(true)}>
              <span>
                <StyledButton
                  disabled={!canAffordBuild}
                  onClick={onBuild}
                  startIcon={<ConstructionIcon />}
                >
                  {isDestroyed ? "Re-build" : "Build"}
                </StyledButton>
              </span>
            </Tooltip>
          )}
          {isDamaged && (
            <Tooltip title={getTooltipTitle(false)}>
              <span>
                <StyledButton
                  disabled={!canAffordRepair}
                  onClick={onRepair}
                  startIcon={<ConstructionIcon />}
                >
                  Repair
                </StyledButton>
              </span>
            </Tooltip>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};
