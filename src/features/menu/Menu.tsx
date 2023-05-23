// REACT
import type { FC } from "react";

// LOCAL FILES
// Redux
import { useAppDispatch } from "features/redux/hooks";
import { setView } from "features/game/gameSlice";

export const Menu: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers
  const onGameStart = () => {
    dispatch(setView("introduction"));
  };

  return (
    <>
      <h1>Pale Pass</h1>
      <button onClick={onGameStart}>Start Game</button>
    </>
  );
};
