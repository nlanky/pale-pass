// REACT
import type { FC } from "react";

// PUBLIC MODULES
import type { ButtonProps } from "@mui/material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Redux
import { setView } from "features/game/actions";

export const ReturnToTownButton: FC<ButtonProps> = ({ ...props }) => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers
  const onReturnToTown = () => {
    dispatch(setView("town"));
  };

  return (
    <StyledButton
      {...props}
      onClick={(event) => {
        props.onClick && props.onClick(event);
        onReturnToTown();
      }}
    >
      Return to Town
    </StyledButton>
  );
};
