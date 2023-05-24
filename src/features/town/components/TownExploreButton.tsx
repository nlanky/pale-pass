// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// LOCAL FILES
// Hooks
import { useValidEvents } from "features/event/hooks";
import { useAppDispatch } from "features/redux/hooks";
import { triggerEvent } from "features/event/eventSlice";
// Utility functions
import { getRandomEvent } from "features/event/utils";

export const TownExploreButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const validEvents = useValidEvents();

  // Handlers
  const onEventTrigger = () => {
    // TODO: Need to prevent user triggering this as often as they want, 1 per 12 turns perhaps?
    dispatch(triggerEvent(getRandomEvent(validEvents)));
  };

  return (
    <Button
      disabled={validEvents.length === 0}
      fullWidth
      onClick={onEventTrigger}
      startIcon={<SearchIcon />}
      variant="contained"
    >
      Explore
    </Button>
  );
};
