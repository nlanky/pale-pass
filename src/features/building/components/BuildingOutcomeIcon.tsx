// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Typography } from "@mui/material";

// LOCAL FILES
// Components
import { BuildingAvatar } from "features/building/components";
// Icons & Images
import {
  negativeOutcomeIcon,
  positiveOutcomeIcon,
} from "assets/common";

interface BuildingOutcomeIconProps {
  buildingId: number;
  isPositive: boolean;
  text?: string;
  disabled?: boolean;
}

export const BuildingOutcomeIcon: FC<BuildingOutcomeIconProps> = ({
  buildingId,
  isPositive,
  text,
  disabled,
}) => (
  <Grid
    alignItems="center"
    container
    item
    sx={{ position: "relative", width: "auto" }}
    wrap="nowrap"
  >
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

    <BuildingAvatar
      buildingId={buildingId}
      variant="exterior"
      hideStateOverlay
      hideStateText
      width={38}
      height={38}
      style={{
        // Icons need to be offset to show all of positive/negative icon
        position: "absolute",
        top: 13,
        left: 13,
      }}
    />

    {text && (
      <Typography
        sx={{
          color: disabled ? "text.disabled" : "text.primary",
          ml: 1,
        }}
        variant="body2"
      >
        {text}
      </Typography>
    )}

    {disabled && (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 64,
          height: 64,
          backgroundColor: "action.disabled",
        }}
      />
    )}
  </Grid>
);
