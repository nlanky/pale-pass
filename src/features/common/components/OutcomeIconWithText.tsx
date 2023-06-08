// REACT
import type { FC } from "react";

// PUBLiC MODULES
import { Grid, Typography } from "@mui/material";

// LOCAL FILES
// Components
import { OutcomeIcon } from "features/common/components";

interface OutcomeIconWithTextProps {
  icon: string;
  isPositive: boolean;
  text: string;
  disabled?: boolean;
}

export const OutcomeIconWithText: FC<OutcomeIconWithTextProps> = ({
  icon,
  isPositive,
  text,
  disabled = false,
}) => (
  <Grid
    alignItems="center"
    container
    item
    sx={{ width: "auto" }}
    wrap="nowrap"
  >
    <OutcomeIcon
      icon={icon}
      isPositive={isPositive}
      disabled={disabled}
    />
    <Typography
      sx={{
        color: disabled ? "text.disabled" : "text.primary",
        ml: 1,
      }}
      variant="body2"
    >
      {text}
    </Typography>
  </Grid>
);
