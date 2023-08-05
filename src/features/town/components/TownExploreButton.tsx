// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Search as SearchIcon } from "@mui/icons-material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Redux
import { triggerEvent } from "features/event/actions";
import {
  selectCanExplore,
  selectValidEvents,
} from "features/event/eventSlice";
// Utility functions
import { getRandomEvent } from "features/event/utils";

export const TownExploreButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const canExplore = useAppSelector(selectCanExplore);
  const validEvents = useAppSelector(selectValidEvents);

  // Handlers
  const onEventTrigger = () => {
    dispatch(triggerEvent(getRandomEvent(validEvents)));
  };

  return (
    <StyledButton
      disabled={!canExplore}
      onClick={onEventTrigger}
      startIcon={<SearchIcon />}
      width={185}
    >
      Explore
    </StyledButton>
  );
};
