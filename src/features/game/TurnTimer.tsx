// REACT
import { useEffect } from "react";
import type { FC } from "react";

// LOCAL FILES
// Constants
import { TURN_TIME } from "features/game/constants";
// Redux
import { useAppDispatch } from "features/redux/hooks";
import { incrementTurn } from "features/game/gameSlice";

/**
 * Component that only renders when in town view. Responsible
 * for incrementing the turn counter.
 */
export const TurnTimer: FC<{}> = () => {
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
    }, []);

    return <></>;
};