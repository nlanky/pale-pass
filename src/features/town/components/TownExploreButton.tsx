// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Search as SearchIcon } from "@mui/icons-material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Constants
import { TURNS_PER_EVENT } from "features/event/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
import {
  selectSeenEvents,
  triggerEvent,
} from "features/event/eventSlice";
import { selectTurn } from "features/game/gameSlice";
import { selectPlayerTown } from "features/town/townSlice";
// Utility functions
import { getRandomEvent, getValidEvents } from "features/event/utils";

export const TownExploreButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const town = useAppSelector(selectPlayerTown);
  const turn = useAppSelector(selectTurn);
  const eventsSeen = useAppSelector(selectSeenEvents);

  // Derived variables
  const validEvents = getValidEvents(town, eventsSeen);
  const numberOfSeenEvents = eventsSeen.length;
  const canExplore =
    turn !== 0 &&
    validEvents.length !== 0 &&
    (numberOfSeenEvents === 0 ||
      Math.ceil(turn / numberOfSeenEvents) > TURNS_PER_EVENT);

  // Handlers
  const onEventTrigger = () => {
    dispatch(triggerEvent(getRandomEvent(validEvents)));
  };

  return (
    <StyledButton
      disabled={!canExplore}
      fullWidth
      onClick={onEventTrigger}
      startIcon={<SearchIcon />}
      variant="contained"
    >
      Explore
    </StyledButton>
  );
};
