// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Icon } from "@mui/material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Images & Icons
import { buildingBuiltIcon } from "assets/building";
// Redux
import { setView } from "features/game/actions";

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
            src={buildingBuiltIcon}
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
