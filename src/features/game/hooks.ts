// REACT
import { useEffect } from "react";

// LOCAL FILES
// Constants
import { TURN_TIME } from "features/game/constants";
// Redux
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
import { selectModalBuildingId } from "features/building/buildingSlice";
import { incrementTurn } from "features/game/gameSlice";

export const useTurnTimer = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const modalBuildingId = useAppSelector(selectModalBuildingId);

  // Effects
  useEffect(() => {
    // If modal is open, pause game
    if (modalBuildingId) {
      return;
    }

    const timer = setInterval(() => {
      dispatch(incrementTurn());
    }, TURN_TIME);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch, modalBuildingId]);
};
