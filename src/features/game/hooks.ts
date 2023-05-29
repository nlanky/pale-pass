// REACT
import { useEffect } from "react";

// LOCAL FILES
// Constants
import { TURN_TIME } from "features/game/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Redux
import {
  incrementTurn,
  selectGamePaused,
  selectGameSpeed,
} from "features/game/gameSlice";

export const useTurnTimer = () => {
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
      dispatch(incrementTurn());
    }, TURN_TIME / gameSpeed);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch, gamePaused, gameSpeed]);
};
