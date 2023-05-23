// REACT
import { useEffect, useState } from "react";

// LOCAL FILES
// Constants
import {
  EVENT_PROBABILITY,
  TURNS_PER_EVENT,
} from "features/event/constants";
// Interfaces & Types
import type { Event } from "features/event/types";
// Redux
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
import {
  selectSeenEvents,
  triggerEvent,
} from "features/event/eventSlice";
import { selectTurn } from "features/game/gameSlice";
import { selectPlayerTown } from "features/town/townSlice";
// Utility functions
import { getValidEvent, getValidEvents } from "features/event/utils";

export const useEventTimer = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const turn = useAppSelector(selectTurn);
  const seenEvents = useAppSelector(selectSeenEvents);
  const town = useAppSelector(selectPlayerTown);

  useEffect(() => {
    // Don't want to trigger event too often or before the game starts
    const numberOfEvents = seenEvents.length;
    if (
      turn === 0 ||
      (numberOfEvents !== 0 &&
        Math.floor(turn / numberOfEvents) <= TURNS_PER_EVENT)
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
      (numberOfEvents === 0 && turn === TURNS_PER_EVENT) ||
      Math.floor(turn / (numberOfEvents + 1)) === TURNS_PER_EVENT ||
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

export const useValidEvents = (): Event[] => {
  // Hooks
  const town = useAppSelector(selectPlayerTown);
  const eventsSeen = useAppSelector(selectSeenEvents);

  // Local state
  const [validEvents, setValidEvents] = useState<Event[]>([]);

  // Effects
  useEffect(() => {
    setValidEvents(getValidEvents(town, eventsSeen));
  }, [eventsSeen, town]);

  return validEvents;
};
