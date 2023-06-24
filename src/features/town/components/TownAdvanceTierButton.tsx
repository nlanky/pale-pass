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
import {
  useCanAdvanceTier,
  useTierRequirements,
} from "features/town/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { selectPlayerTier, setTier } from "features/town/townSlice";

export const TownAdvanceTierButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const tier = useAppSelector(selectPlayerTier);
  const canAdvanceTier = useCanAdvanceTier();
  const tierRequirements = useTierRequirements();

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
          fullWidth
          onClick={onAdvanceTier}
          startIcon={<KeyboardDoubleArrowUpIcon />}
          variant="contained"
        >
          Advance Tier
        </StyledButton>
      </span>
    </Tooltip>
  );
};
