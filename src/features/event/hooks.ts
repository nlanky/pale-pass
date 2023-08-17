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
import { triggerEvent } from "features/event/actions";
import { selectDay } from "features/game/selectors";
import {
  selectCompletedEvents,
  selectValidEvent,
} from "features/town/selectors";

export const useEventTimer = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const day = useAppSelector(selectDay);
  const completedEvents = useAppSelector(selectCompletedEvents);
  const validEvent = useAppSelector(selectValidEvent);

  useEffect(() => {
    // Don't want to trigger event too often or before the game starts
    const numberOfSeenEvents = completedEvents.length;
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
      if (validEvent) {
        dispatch(triggerEvent(validEvent.id));
      }
    }
  }, [completedEvents, day, dispatch, validEvent]);
};
