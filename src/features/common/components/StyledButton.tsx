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
import {
  BUTTON_HEIGHT,
  DEFAULT_NINE_SLICE_BUTTON_HORIZONTAL_BORDER_WIDTH,
  DEFAULT_NINE_SLICE_BUTTON_VERTICAL_BORDER_WIDTH,
} from "features/common/constants";

export interface StyledButtonProps extends ButtonProps {
  width: number; // Varies depending on size of text
  borders?: {
    horizontal: number; // Applied to left and right of container
    vertical: number; // Applied to top and bottom of container
  };
  nineSliceStyles?: NineSliceStyles;
}

export const StyledButton: FC<StyledButtonProps> = ({
  width,
  borders,
  nineSliceStyles,
  sx,
  ...rest
}) => {
  // Derived variables
  const horizontalBorder =
    borders?.horizontal ||
    DEFAULT_NINE_SLICE_BUTTON_HORIZONTAL_BORDER_WIDTH;
  const verticalBorder =
    borders?.vertical ||
    DEFAULT_NINE_SLICE_BUTTON_VERTICAL_BORDER_WIDTH;

  return (
    <NineSlice
      width={width}
      height={BUTTON_HEIGHT}
      borders={{
        horizontal: horizontalBorder,
        vertical: verticalBorder,
      }}
      styles={nineSliceStyles}
    >
      <Button
        fullWidth
        sx={{
          ...sx,
          color: "text.primary",
          height: BUTTON_HEIGHT - verticalBorder * 2,
          textTransform: "none",
          width: width - horizontalBorder * 2,
        }}
        {...rest}
      />
    </NineSlice>
  );
};
