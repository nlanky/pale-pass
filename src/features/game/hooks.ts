// REACT
import { useEffect } from "react";

// LOCAL FILES
// Constants
import { TURN_TIME } from "features/game/constants";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Redux
import { incrementTurn } from "features/game/gameSlice";

export const useTurnTimer = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Effects
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(incrementTurn());
    }, TURN_TIME);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);
};
