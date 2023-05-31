// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Map as MapIcon } from "@mui/icons-material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Redux
import { setView } from "features/game/gameSlice";

export const TownMapButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers
  const onMapClick = () => {
    dispatch(setView("map"));
  };

  return (
    <StyledButton
      fullWidth
      onClick={onMapClick}
      startIcon={<MapIcon />}
      variant="contained"
    >
      Map
    </StyledButton>
  );
};
