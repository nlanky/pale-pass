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
import { BuildingAvatar, Market } from "features/building/components";
import {
  OutcomeIconWithText,
  PlaceholderText,
  StyledButton,
  StyledPaper,
} from "features/common/components";
// Constants
import {
  BUILDING_ID_MARKET,
  ID_TO_BUILDING,
} from "features/building/constants";
import { RESOURCE_TO_ICON } from "features/resource/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { closeModal } from "features/building/actions";
import {
  selectCanBuildModalBuilding,
  selectCanRepairModalBuilding,
  selectModalBuilding,
  selectModalTownBuilding,
} from "features/building/buildingSlice";
import { buildBuilding, repairBuilding } from "features/town/actions";

export const BuildingModal: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const building = useAppSelector(selectModalBuilding);
  const townBuilding = useAppSelector(selectModalTownBuilding);
  const canBuild = useAppSelector(selectCanBuildModalBuilding);
  const canRepair = useAppSelector(selectCanRepairModalBuilding);

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
  const canBuildEnabled =
    (building.canBuild && townBuilding === undefined) || isDestroyed;
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
    <Dialog
      onClose={onModalClose}
      open={building !== undefined}
      PaperComponent={StyledPaper}
    >
      <DialogTitle>{building.name}</DialogTitle>

      <DialogContent>
        <Grid container justifyContent="space-between" wrap="nowrap">
          {isUnbuiltOrBuilding && (
            <PlaceholderText
              text={building.text.preBuild}
              variant="body2"
            />
          )}
          {!isUnbuiltOrBuilding && (
            <PlaceholderText
              sx={{ mr: 1 }}
              text={building.text.postBuild}
              variant="body2"
            />
          )}
          <BuildingAvatar
            buildingId={building.id}
            isInterior
            hideStateOverlay
            width={170}
            height={170}
          />
        </Grid>

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

        {isBuilt && building.id === BUILDING_ID_MARKET && (
          <>
            <Divider sx={{ mt: 1 }} />
            <Market />
          </>
        )}
      </DialogContent>

      {!(isBuilding || isRepairing) &&
        (canBuildEnabled || isDamaged) && (
          <DialogActions>
            {canBuildEnabled && (
              <Tooltip title={getTooltipTitle(true)}>
                <span>
                  <StyledButton
                    disabled={!canBuild}
                    onClick={onBuild}
                    startIcon={<ConstructionIcon />}
                    width={120}
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
                    disabled={!canRepair}
                    onClick={onRepair}
                    startIcon={<ConstructionIcon />}
                    width={120}
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
