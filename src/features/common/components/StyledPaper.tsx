// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Paper, type PaperProps } from "@mui/material";

// LOCAL FILES
// Interfaces & Types
import {
  NineSlice,
  type NineSliceStyles,
} from "features/common/components";

interface StyledPaperProps extends PaperProps {
  nineSliceStyles?: NineSliceStyles;
}

export const StyledPaper: FC<StyledPaperProps> = ({
  nineSliceStyles,
  sx,
  ...rest
}) => (
  <NineSlice
    width={600}
    height={600}
    borders={{ horizontal: 0, vertical: 0 }}
    styles={{
      content: {
        /*
          To make sure content is inside background image "border".
          Absolutely disgusting, don't judge me...
        */
        padding: "29px",
      },
      ...nineSliceStyles,
    }}
  >
    <Paper
      sx={{
        // I hate this but it's how MUI doesn't let you override easily...
        height: "100%",
        margin: `0 !important`,
        maxHeight: "100% !important",
        overflow: "hidden !important",
      }}
      {...rest}
    />
  </NineSlice>
);
