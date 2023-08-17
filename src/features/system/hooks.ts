// REACT
import { useEffect } from "react";

// LOCAL FILES
// Constants
import { DAY_TIME } from "features/system/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Redux
import { setDay } from "features/system/actions";
import {
  selectDay,
  selectGamePaused,
  selectGameSpeed,
} from "features/system/selectors";

/**
 * Responsible for controlling day cycle.
 */
export const useDayTimer = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const day = useAppSelector(selectDay);
  const gamePaused = useAppSelector(selectGamePaused);
  const gameSpeed = useAppSelector(selectGameSpeed);

  // Effects
  useEffect(() => {
    if (gamePaused) {
      return;
    }

    const timer = setInterval(() => {
      dispatch(setDay(day + 1));
    }, DAY_TIME / gameSpeed);
    return () => {
      clearInterval(timer);
    };
  }, [day, dispatch, gamePaused, gameSpeed]);
};
