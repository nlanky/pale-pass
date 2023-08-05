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
  <NineSlice width={600} height={600} styles={nineSliceStyles}>
    <Paper
      sx={{
        // I hate this but it's how MUI does modals
        width: "100%",
        height: "100%",
        margin: `28px !important`,
        maxHeight: `calc(600px - 56px) !important`,
      }}
      {...rest}
    />
  </NineSlice>
);
