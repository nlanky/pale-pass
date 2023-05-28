// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid } from "@mui/material";

// LOCAL FILES
// Icons & Images
import {
  negativeOutcomeIcon,
  positiveOutcomeIcon,
} from "assets/common";

interface OutcomeIconProps {
  icon: string;
  outcome: "positive" | "negative";
}

export const OutcomeIcon: FC<OutcomeIconProps> = ({
  icon,
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
      src={icon}
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
