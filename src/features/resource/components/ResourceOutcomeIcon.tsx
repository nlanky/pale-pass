// REACT
import type { FC } from "react";

// PUBLIC MODULES
import {
  Grid,
  type SxProps,
  Typography,
  useTheme,
} from "@mui/material";

// LOCAL FILES
// Components
import { Image } from "features/common/components";
// Constants
import { RESOURCE_TO_IMAGE } from "features/resource/constants";
// Icons & Images
import {
  negativeOutcomeIcon,
  positiveOutcomeIcon,
} from "assets/common";
// Interfaces & Types
import type { Resource } from "features/resource/types";

interface ResourceOutcomeIconProps {
  resource: Resource;
  isPositive: boolean;
  text?: string;
  disabled?: boolean;
  styles?: {
    container?: SxProps;
  };
}

export const ResourceOutcomeIcon: FC<ResourceOutcomeIconProps> = ({
  resource,
  isPositive,
  text,
  disabled,
  styles = {
    container: {},
  },
}) => {
  // Hooks
  const theme = useTheme();

  return (
    <Grid
      alignItems="center"
      container
      item
      sx={{
        position: "relative",
        width: "auto",
        ...styles.container,
      }}
      wrap="nowrap"
    >
      {isPositive && (
        <Image
          src={positiveOutcomeIcon}
          style={{ width: 64, height: 64 }}
        />
      )}
      {!isPositive && (
        <Image
          src={negativeOutcomeIcon}
          style={{ width: 64, height: 64 }}
        />
      )}

      <Image
        src={RESOURCE_TO_IMAGE[resource]}
        style={{
          position: "absolute",
          // Icons need to be offset to show all of positive/negative icon
          top: 12,
          left: 12,
          width: 40,
          height: 40,
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
            backgroundColor: theme.palette.action.disabled,
          }}
        />
      )}
    </Grid>
  );
};
