// REACT
import type { FC, ReactNode } from "react";

// PUBLIC MODULES
import { Button, Grid, Tooltip, Typography } from "@mui/material";
import { KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon } from "@mui/icons-material";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Hooks
import {
  useCanAdvanceTier,
  useTierRequirements,
} from "features/town/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { useAppDispatch } from "features/redux/hooks";
import { advanceTier } from "features/town/townSlice";

export const TownAdvanceTierButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const canAdvanceTier = useCanAdvanceTier();
  const tierRequirements = useTierRequirements();

  // Handlers
  const onAdvanceTier = () => {
    dispatch(advanceTier());
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
        <Typography key={resource} variant="body1">
          {resource}: {Math.abs(tierRequirements.resources[resource])}
        </Typography>
      ));

    const buildingRequirements = tierRequirements.buildings.map(
      (buildingId) => (
        <Typography key={buildingId} variant="body1">
          {ID_TO_BUILDING[buildingId].name}
        </Typography>
      ),
    );

    const villagerRequirements = tierRequirements.villagers.map(
      (villagerId) => (
        <Typography key={villagerId} variant="body1">
          {ID_TO_VILLAGER[villagerId].name}
        </Typography>
      ),
    );

    return (
      <Grid container direction="column">
        <Typography sx={{ fontWeight: 700 }} variant="body1">
          Resource requirements
        </Typography>
        {resourceRequirements}
        {buildingRequirements.length !== 0 && (
          <>
            <Typography sx={{ fontWeight: 700 }} variant="body1">
              Building requirements
            </Typography>
            {buildingRequirements}
          </>
        )}
        {villagerRequirements.length !== 0 && (
          <>
            <Typography sx={{ fontWeight: 700 }} variant="body1">
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
        <Button
          disabled={!canAdvanceTier}
          fullWidth
          onClick={onAdvanceTier}
          startIcon={<KeyboardDoubleArrowUpIcon />}
          variant="contained"
        >
          Advance Tier
        </Button>
      </span>
    </Tooltip>
  );
};