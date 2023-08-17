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
import { villagerIcon } from "assets/villager";
// Redux
import { setView } from "features/system/actions";

export const TownVillagersButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers
  const onVillagersClick = () => {
    dispatch(setView("villager"));
  };

  return (
    <StyledButton
      onClick={onVillagersClick}
      startIcon={
        <Icon>
          <Image
            src={villagerIcon}
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
      Villagers
    </StyledButton>
  );
};
