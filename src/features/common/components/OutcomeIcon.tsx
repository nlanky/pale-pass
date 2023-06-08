// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, useTheme } from "@mui/material";

// LOCAL FILES
// Icons & Images
import {
  negativeOutcomeIcon,
  positiveOutcomeIcon,
} from "assets/common";

interface OutcomeIconProps {
  icon: string;
  isPositive: boolean;
  disabled: boolean;
}

export const OutcomeIcon: FC<OutcomeIconProps> = ({
  icon,
  isPositive,
  disabled,
}) => {
  // Hooks
  const theme = useTheme();

  return (
    <Grid item sx={{ position: "relative" }}>
      {isPositive && (
        <img
          src={positiveOutcomeIcon}
          style={{ width: 64, height: 64 }}
        />
      )}
      {!isPositive && (
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
      {disabled && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 64,
            height: 64,
            backgroundColor: theme.palette.action.disabled,
          }}
        />
      )}
    </Grid>
  );
};
