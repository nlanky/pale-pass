// REACT
import { useEffect } from "react";

// LOCAL FILES
// Constants
import { DAY_TIME } from "features/game/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Redux
import {
  incrementDay,
  selectGamePaused,
  selectGameSpeed,
} from "features/game/gameSlice";

/**
 * Responsible for controlling day cycle.
 */
export const useDayTimer = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const gamePaused = useAppSelector(selectGamePaused);
  const gameSpeed = useAppSelector(selectGameSpeed);

  // Effects
  useEffect(() => {
    if (gamePaused) {
      return;
    }

    const timer = setInterval(() => {
      dispatch(incrementDay());
    }, DAY_TIME / gameSpeed);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch, gamePaused, gameSpeed]);
};
