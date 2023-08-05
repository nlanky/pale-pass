// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";

// LOCAL FILES
// Components
import {
  NineSlice,
  type NineSliceStyles,
} from "features/common/components";
// Constants
import { BUTTON_HEIGHT } from "features/common/constants";

export interface StyledButtonProps extends ButtonProps {
  width: number; // Varies depending on size of text
  nineSliceStyles?: NineSliceStyles;
}

export const StyledButton: FC<StyledButtonProps> = ({
  width,
  nineSliceStyles,
  sx,
  ...rest
}) => (
  <NineSlice
    width={width}
    height={BUTTON_HEIGHT}
    styles={nineSliceStyles}
  >
    <Button
      fullWidth
      sx={{
        ...sx,
        color: "text.primary",
        height: BUTTON_HEIGHT,
        textTransform: "none",
        width,
      }}
      {...rest}
    />
  </NineSlice>
);
