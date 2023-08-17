// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { MenuBook as MenuBookIcon } from "@mui/icons-material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Redux
import { setView } from "features/system/actions";

export const TownLogButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers
  const onMapClick = () => {
    dispatch(setView("log"));
  };

  return (
    <StyledButton
      onClick={onMapClick}
      startIcon={<MenuBookIcon />}
      width={185}
    >
      Log
    </StyledButton>
  );
};
