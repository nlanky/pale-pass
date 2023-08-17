// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Home as HomeIcon } from "@mui/icons-material";
import type { ButtonProps } from "@mui/material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Interfaces & Types
import type { NineSliceStyles } from "features/common/components";
// Redux
import { setView } from "features/system/actions";

export interface ReturnToTownButtonProps extends ButtonProps {
  nineSliceStyles?: NineSliceStyles;
}

export const ReturnToTownButton: FC<ReturnToTownButtonProps> = ({
  ...props
}) => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers
  const onReturnToTown = () => {
    dispatch(setView("town"));
  };

  return (
    <StyledButton
      {...props}
      nineSliceStyles={props.nineSliceStyles}
      onClick={(event) => {
        props.onClick && props.onClick(event);
        onReturnToTown();
      }}
      startIcon={<HomeIcon />}
      width={100}
    >
      Town
    </StyledButton>
  );
};
