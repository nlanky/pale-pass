// REACT
import type { FC, ReactNode } from "react";

// PUBLIC MODULES
import { Grid, Tooltip, Typography } from "@mui/material";
import { KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon } from "@mui/icons-material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { setTier } from "features/town/actions";
import {
  selectCanAdvanceTier,
  selectTierRequirements,
  selectTownTier,
} from "features/town/selectors";

export const TownAdvanceTierButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const tier = useAppSelector(selectTownTier);
  const canAdvanceTier = useAppSelector(selectCanAdvanceTier);
  const tierRequirements = useAppSelector(selectTierRequirements);

  // Handlers
  const onAdvanceTier = () => {
    dispatch(setTier(tier + 1));
  };

  // Utility functions
  const getTooltipTitle = (): ReactNode => {
    if (!tierRequirements) {
      return null;
    }

    const resourceRequirements = (
      Object.keys(tierRequirements.resources) as Resource[]
    )
      .filter(
        (resource) => tierRequirements.resources[resource] !== 0,
      )
      .map((resource) => (
        <Typography key={resource} variant="body2">
          {resource}: {Math.abs(tierRequirements.resources[resource])}
        </Typography>
      ));

    const buildingRequirements = tierRequirements.buildingIds.map(
      (buildingId) => (
        <Typography key={buildingId} variant="body2">
          {ID_TO_BUILDING[buildingId].name}
        </Typography>
      ),
    );

    const villagerRequirements = tierRequirements.villagerIds.map(
      (villagerId) => (
        <Typography key={villagerId} variant="body2">
          {ID_TO_VILLAGER[villagerId].name}
        </Typography>
      ),
    );

    return (
      <Grid container direction="column">
        <Typography sx={{ fontWeight: "bold" }} variant="body2">
          Resource requirements
        </Typography>
        {resourceRequirements}
        {buildingRequirements.length !== 0 && (
          <>
            <Typography sx={{ fontWeight: "bold" }} variant="body2">
              Building requirements
            </Typography>
            {buildingRequirements}
          </>
        )}
        {villagerRequirements.length !== 0 && (
          <>
            <Typography sx={{ fontWeight: "bold" }} variant="body2">
              Villager requirements
            </Typography>
            {villagerRequirements}
          </>
        )}
      </Grid>
    );
  };

  return (
    <Tooltip title={getTooltipTitle()}>
      <span>
        <StyledButton
          disabled={!canAdvanceTier}
          onClick={onAdvanceTier}
          startIcon={<KeyboardDoubleArrowUpIcon />}
          width={185}
        >
          Advance Tier
        </StyledButton>
      </span>
    </Tooltip>
  );
};
