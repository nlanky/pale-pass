// REACT
import { useEffect } from "react";

// LOCAL FILES
// Constants
import { TURN_TIME } from "features/game/constants";
// Redux
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
import { selectOpenBuildingModal } from "features/building/buildingSlice";
import { incrementTurn } from "features/game/gameSlice";

export const useTurnTimer = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const openModal = useAppSelector(selectOpenBuildingModal);

  // Effects
  useEffect(() => {
    // If modal is open, pause game
    if (openModal) {
      return;
    }

    const timer = setInterval(() => {
      dispatch(incrementTurn());
    }, TURN_TIME);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch, openModal]);
};
