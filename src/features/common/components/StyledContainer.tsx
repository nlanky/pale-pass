// REACT
import type { FC, ReactNode } from "react";

// PUBLIC MODULES
import { Grid, type GridProps } from "@mui/material";

// LOCAL FILES
// Interfaces & Types
import {
  NineSlice,
  type NineSliceStyles,
} from "features/common/components";

interface StyledContainerProps extends GridProps {
  width?: number;
  height?: number;
  nineSliceStyles?: NineSliceStyles;
  children: ReactNode;
}

export const StyledContainer: FC<StyledContainerProps> = ({
  width = 1200, // Matches MUI Container maxWidth for lg screen
  height = 800, // Roughly the right size to make the NineSlice borders look ok
  nineSliceStyles,
  children,
  sx,
  ...rest
}) => (
  <NineSlice
    width={width}
    height={height}
    borders={{
      horizontal: 0,
      vertical: 0,
    }}
    styles={{
      container: {
        display: "block",
        boxSizing: "border-box",
        marginLeft: "auto",
        marginRight: "auto",
        overflow: "hidden",
      },
      content: {
        /*
          To make sure content is inside background image "border".
          Absolutely disgusting, don't judge me...
        */
        padding: "58px 72px",
      },
      ...nineSliceStyles,
    }}
  >
    <Grid
      container
      direction="column"
      sx={{ height: "100%", ...sx }}
      wrap="nowrap"
      {...rest}
    >
      {children}
    </Grid>
  </NineSlice>
);
