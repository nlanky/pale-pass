// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Icon } from "@mui/material";

// LOCAL FILES
// Components
import { Image, StyledButton } from "features/common/components";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Images & Icons
import { buildingIcon } from "assets/building";
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
      onClick={onBuildingsClick}
      startIcon={
        <Icon>
          <Image
            src={buildingIcon}
            style={{
              display: "flex",
              width: "inherit",
              height: "inherit",
            }}
          />
        </Icon>
      }
      width={185}
    >
      Buildings
    </StyledButton>
  );
};
