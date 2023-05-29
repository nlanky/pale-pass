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
  useTheme,
} from "@mui/material";
import {
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Healing as HealingIcon,
} from "@mui/icons-material";

// LOCAL FILES
// Components
import {
  OutcomeIconWithText,
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
  healVillager,
  recruitVillager,
  selectPlayerTown,
} from "features/town/townSlice";
import {
  closeModal,
  selectModalTownVillager,
  selectModalVillager,
} from "features/villager/villagerSlice";
// Utility functions
import { canRecruitVillager } from "features/villager/utils";

export const VillagerModal: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const villager = useAppSelector(selectModalVillager);
  const townVillager = useAppSelector(selectModalTownVillager);
  const town = useAppSelector(selectPlayerTown);

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
  const isRecovering = townVillager?.state === "recovering";
  const isInjured = townVillager?.state === "injured";
  const canRecruit =
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

    return (
      <Grid container direction="column">
        {buildingRequirementsJsx.length !== 0 && (
          <>
            <Typography sx={{ fontWeight: 700 }} variant="body2">
              Building requirements
            </Typography>
            {buildingRequirementsJsx}
          </>
        )}
        {villagerRequirementsJsx.length !== 0 && (
          <>
            <Typography sx={{ fontWeight: 700 }} variant="body2">
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
      <DialogTitle>{`${villager.name} the ${villager.occupation}`}</DialogTitle>

      <DialogContent>
        <Typography variant="body2">
          {villager.description}
        </Typography>

        {affectedResources.length !== 0 && (
          <>
            <Divider sx={{ marginTop: theme.spacing(1) }} />
            <Grid
              container
              spacing={1}
              sx={{ marginTop: theme.spacing(1) }}
            >
              {affectedResources.map((resource) => {
                const amount = villager.gatherResources[resource];
                const isPositive = amount > 0;
                return (
                  <OutcomeIconWithText
                    key={resource}
                    icon={RESOURCE_TO_ICON[resource]}
                    outcome={isPositive ? "positive" : "negative"}
                    text={`${
                      isPositive ? "+" : ""
                    } ${amount} ${resource} per turn`}
                  />
                );
              })}
            </Grid>
          </>
        )}

        {isRecovering && (
          <>
            <Divider sx={{ marginTop: theme.spacing(1) }} />
            <Typography
              sx={{ marginTop: theme.spacing(1) }}
              variant="body2"
            >
              Villager is recovering. Turns remaining:{" "}
              {townVillager?.recoveryTimeRemaining}
            </Typography>
          </>
        )}
      </DialogContent>

      {canRecruit ||
        (!isRecovering && isInjured && (
          <DialogActions>
            {canRecruit && (
              <Tooltip title={getTooltipTitle()}>
                <span>
                  <StyledButton
                    disabled={!canRecruitVillager(town, villager)}
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
        ))}
    </Dialog>
  );
};
