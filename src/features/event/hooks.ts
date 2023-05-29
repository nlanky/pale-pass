// REACT
import { useEffect } from "react";

// LOCAL FILES
// Constants
import {
  DAYS_PER_EVENT,
  EVENT_PROBABILITY,
} from "features/event/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Redux
import {
  selectSeenEvents,
  triggerEvent,
} from "features/event/eventSlice";
import { selectDay } from "features/game/gameSlice";
import { selectPlayerTown } from "features/town/townSlice";
// Utility functions
import { getValidEvent } from "features/event/utils";

export const useEventTimer = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const day = useAppSelector(selectDay);
  const seenEvents = useAppSelector(selectSeenEvents);
  const town = useAppSelector(selectPlayerTown);

  useEffect(() => {
    // Don't want to trigger event too often or before the game starts
    const numberOfSeenEvents = seenEvents.length;
    if (
      day === 0 ||
      (numberOfSeenEvents !== 0 &&
        Math.ceil(day / numberOfSeenEvents) <= DAYS_PER_EVENT)
    ) {
      return;
    }

    /*
      Breaking down these checks:
      1) No events in first DAYS_PER_EVENT, auto-trigger
      2) Not maintaining quota of DAYS_PER_EVENT, auto-trigger
      3) Randomly trigger event
    */
    if (
      (numberOfSeenEvents === 0 && day === DAYS_PER_EVENT) ||
      Math.floor(day / (numberOfSeenEvents + 1)) >= DAYS_PER_EVENT ||
      Math.random() < EVENT_PROBABILITY
    ) {
      /*
        TODO: This will probably end up in the final release but should
        really find a way of avoiding running getValidEvent so often.
      */
      const event = getValidEvent(town, seenEvents);
      if (event) {
        dispatch(triggerEvent(event));
      }
    }
  }, [day, dispatch, town, seenEvents]);
};
