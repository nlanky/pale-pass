// REACT
import type { FC, ReactNode } from "react";

// PUBLIC MODULES
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Healing as HealingIcon,
} from "@mui/icons-material";

// LOCAL FILES
// Components
import {
  OutcomeIconWithText,
  PlaceholderText,
  StyledButton,
  StyledPaper,
} from "features/common/components";
import { VillagerModalTitle } from "features/villager/components";
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { RESOURCE_TO_ICON } from "features/resource/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { healVillager, recruitVillager } from "features/town/actions";
import { closeModal } from "features/villager/actions";
import {
  selectCanRecruitModalVillager,
  selectModalTownVillager,
  selectModalVillager,
} from "features/villager/villagerSlice";

export const VillagerModal: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const villager = useAppSelector(selectModalVillager);
  const townVillager = useAppSelector(selectModalTownVillager);
  const canRecruit = useAppSelector(selectCanRecruitModalVillager);

  // Handlers
  const onModalClose = () => {
    dispatch(closeModal());
  };

  const onRecruit = () => {
    dispatch(recruitVillager(villager.id));
  };

  const onHeal = () => {
    dispatch(healVillager(villager.id));
  };

  if (!villager) {
    return null;
  }

  // Derived variables
  const isHealthy = townVillager?.state === "healthy";
  const isRecovering = townVillager?.state === "recovering";
  const isInjured = townVillager?.state === "injured";
  const canRecruitEnabled =
    villager.canRecruit && townVillager === undefined;
  const affectedResources = (
    Object.keys(villager.gatherResources) as Resource[]
  ).filter((resource) => villager.gatherResources[resource] !== 0);

  // Utility functions
  const getTooltipTitle = (): ReactNode => {
    const buildingRequirementsJsx =
      villager.requirements.buildingIds.map((buildingId) => (
        <Typography key={buildingId} variant="body2">
          {ID_TO_BUILDING[buildingId].name}
        </Typography>
      ));

    const villagerRequirementsJsx =
      villager.requirements.villagerIds.map((villagerId) => (
        <Typography key={villagerId} variant="body2">
          {ID_TO_VILLAGER[villagerId].name}
        </Typography>
      ));

    if (
      buildingRequirementsJsx.length === 0 &&
      villagerRequirementsJsx.length === 0
    ) {
      return "";
    }

    return (
      <Grid container direction="column">
        {buildingRequirementsJsx.length !== 0 && (
          <>
            <Typography sx={{ fontWeight: "bold" }} variant="body2">
              Building requirements
            </Typography>
            {buildingRequirementsJsx}
          </>
        )}
        {villagerRequirementsJsx.length !== 0 && (
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
      open={villager !== undefined}
      PaperComponent={StyledPaper}
    >
      <VillagerModalTitle villager={villager} />

      <DialogContent>
        <Grid container wrap="nowrap">
          <PlaceholderText
            sx={{ mr: 1 }}
            text={villager.description}
            variant="body2"
          />
          <Avatar
            alt={villager.name}
            src={villager.icons["healthy"]}
            sx={{ width: 200, height: 200 }}
          />
        </Grid>

        {affectedResources.length !== 0 && (
          <>
            <Divider sx={{ mt: 1 }} />
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {affectedResources.map((resource) => {
                const amount = villager.gatherResources[resource];
                const isPositive = amount > 0;
                return (
                  <OutcomeIconWithText
                    key={resource}
                    icon={RESOURCE_TO_ICON[resource]}
                    isPositive={isPositive}
                    text={`${
                      isPositive ? "+" : ""
                    } ${amount} ${resource} per day`}
                    disabled={!isHealthy}
                  />
                );
              })}
            </Grid>
          </>
        )}

        {isRecovering && (
          <>
            <Divider sx={{ mt: 1 }} />
            <Typography sx={{ mt: 1 }} variant="body2">
              {`Villager is recovering. Days remaining: ${townVillager?.recoveryTimeRemaining}`}
            </Typography>
          </>
        )}
      </DialogContent>

      {(canRecruitEnabled || (!isRecovering && isInjured)) && (
        <DialogActions>
          {canRecruitEnabled && (
            <Tooltip title={getTooltipTitle()}>
              <span>
                <StyledButton
                  disabled={!canRecruit}
                  onClick={onRecruit}
                  startIcon={<AssignmentTurnedInIcon />}
                >
                  Recruit
                </StyledButton>
              </span>
            </Tooltip>
          )}

          {isInjured && (
            <StyledButton
              onClick={onHeal}
              startIcon={<HealingIcon />}
            >
              Heal
            </StyledButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};
