// REACT
import type { FC } from "react";

// PUBLiC MODULES
import { Grid, Typography, useTheme } from "@mui/material";

// LOCAL FILES
// Components
import { OutcomeIcon } from "features/common/components";

interface EventOutcomeIconWithTextProps {
  icon: string;
  outcome: "positive" | "negative";
  text: string;
}

export const EventOutcomeIconWithText: FC<
  EventOutcomeIconWithTextProps
> = ({ icon, outcome, text }) => {
  // Hooks
  const theme = useTheme();

  return (
    <Grid alignItems="center" container item wrap="nowrap">
      <OutcomeIcon icon={icon} outcome={outcome} />
      <Typography
        sx={{ marginLeft: theme.spacing(1) }}
        variant="body2"
      >
        {text}
      </Typography>
    </Grid>
  );
};
