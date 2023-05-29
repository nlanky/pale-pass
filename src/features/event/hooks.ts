// REACT
import { useEffect } from "react";

// LOCAL FILES
// Constants
import {
  EVENT_PROBABILITY,
  TURNS_PER_EVENT,
} from "features/event/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Redux
import {
  selectSeenEvents,
  triggerEvent,
} from "features/event/eventSlice";
import { selectTurn } from "features/game/gameSlice";
import { selectPlayerTown } from "features/town/townSlice";
// Utility functions
import { getValidEvent } from "features/event/utils";

export const useEventTimer = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const turn = useAppSelector(selectTurn);
  const seenEvents = useAppSelector(selectSeenEvents);
  const town = useAppSelector(selectPlayerTown);

  useEffect(() => {
    // Don't want to trigger event too often or before the game starts
    const numberOfSeenEvents = seenEvents.length;
    if (
      turn === 0 ||
      (numberOfSeenEvents !== 0 &&
        Math.ceil(turn / numberOfSeenEvents) <= TURNS_PER_EVENT)
    ) {
      return;
    }

    /*
      Breaking down these checks:
      1) No events in first TURNS_PER_EVENT, auto-trigger
      2) Not maintaining quota of TURNS_PER_EVENT, auto-trigger
      3) Randomly trigger event
    */
    if (
      (numberOfSeenEvents === 0 && turn === TURNS_PER_EVENT) ||
      Math.floor(turn / (numberOfSeenEvents + 1)) >=
        TURNS_PER_EVENT ||
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
  }, [dispatch, town, seenEvents, turn]);
};
