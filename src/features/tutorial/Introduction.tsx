// REACT
import { useState } from "react";
import type { FC } from "react";

// LOCAL FILES
// Constants
import { SCREEN_ID_TO_SCREEN } from "features/tutorial/constants";
// Redux
import { useAppDispatch } from "features/redux/hooks";
import { setView } from "features/game/gameSlice";

export const Introduction: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Local state
  const [screenId, setScreenId] = useState(1);

  // Derived variables
  const screen = SCREEN_ID_TO_SCREEN[screenId];
  const buttonText = screenId === 4 ? "Start Game" : "Next";

  // Handlers
  const advanceScreen = () => {
    // Last screen, start game!
    if (screenId === 4) {
      dispatch(setView("town"));
      return;
    }

    setScreenId(screenId + 1);
  };

  return (
    <>
      <p>{screen.text}</p>
      <button onClick={advanceScreen}>{buttonText}</button>
    </>
  );
};
