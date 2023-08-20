// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Person as PersonIcon } from "@mui/icons-material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
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
      startIcon={<PersonIcon />}
      width={185}
    >
      Villagers
    </StyledButton>
  );
};
