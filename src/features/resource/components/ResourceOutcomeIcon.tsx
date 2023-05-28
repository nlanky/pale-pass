// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid } from "@mui/material";

// LOCAL FILES
// Constants
import { RESOURCE_TO_ICON } from "features/resource/constants";
// Icons & Images
import {
  negativeOutcomeIcon,
  positiveOutcomeIcon,
} from "assets/resource";
// Interfaces & Types
import type { Resource } from "features/resource/types";

interface ResourceOutcomeIconProps {
  resource: Resource;
  outcome: "positive" | "negative";
}

export const ResourceOutcomeIcon: FC<ResourceOutcomeIconProps> = ({
  resource,
  outcome,
}) => (
  <Grid item sx={{ position: "relative" }}>
    {outcome === "positive" && (
      <img
        src={positiveOutcomeIcon}
        style={{ width: 64, height: 64 }}
      />
    )}
    {outcome === "negative" && (
      <img
        src={negativeOutcomeIcon}
        style={{ width: 64, height: 64 }}
      />
    )}
    <img
      src={RESOURCE_TO_ICON[resource]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 64,
        height: 64,
      }}
    />
  </Grid>
);
