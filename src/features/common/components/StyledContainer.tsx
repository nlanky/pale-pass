// REACT
import type { FC, ReactNode } from "react";

// PUBLIC MODULES
import { Grid, useTheme } from "@mui/material";

// LOCAL FILES
// Hooks
import { useWindowDimensions } from "features/common/hooks";
// Interfaces & Types
import {
  NineSlice,
  type NineSliceStyles,
} from "features/common/components";

interface StyledContainerProps {
  width?: number;
  height?: number;
  nineSliceStyles?: NineSliceStyles;
  children: ReactNode;
}

export const StyledContainer: FC<StyledContainerProps> = ({
  width = 1200, // Matches MUI Container maxWidth for lg screen
  height = window.innerHeight - 16, // Allow for default body margin
  nineSliceStyles,
  children,
}) => {
  // Hooks
  const theme = useTheme();
  const windowDimensions = useWindowDimensions();

  return (
    <NineSlice
      width={width || windowDimensions.width}
      height={height || windowDimensions.height - theme.gap(2)}
      styles={{
        container: {
          display: "block",
          boxSizing: "border-box",
          marginLeft: "auto",
          marginRight: "auto",
        },
        content: {
          // To make sure content is inside background image "border"
          padding: theme.spacing(9),
        },
        ...nineSliceStyles,
      }}
    >
      <Grid
        container
        direction="column"
        sx={{ height: "100%", overflowY: "auto" }}
        wrap="nowrap"
      >
        {children}
      </Grid>
    </NineSlice>
  );
};
