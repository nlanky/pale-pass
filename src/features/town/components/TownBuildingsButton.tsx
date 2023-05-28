// REACT
import type { FC } from "react";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
import { setView } from "features/game/gameSlice";
// Images & Icons
import { buildingIcon } from "assets/building";
import { Icon } from "@mui/material";

export const TownBuildingsButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers
  const onBuildingsClick = () => {
    dispatch(setView("building"));
  };

  return (
    <StyledButton
      fullWidth
      onClick={onBuildingsClick}
      startIcon={
        <Icon>
          <img
            src={buildingIcon}
            style={{
              display: "flex",
              width: "inherit",
              height: "inherit",
            }}
          />
        </Icon>
      }
      variant="contained"
    >
      Buildings
    </StyledButton>
  );
};
