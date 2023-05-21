// REACT
import type { FC } from "react";

// LOCAL FILES
// Components
import { Menu } from "features/menu/Menu";
import { Overview } from "features/town/Overview";
// Redux
import { useAppSelector } from "features/redux/hooks";
import { selectView } from "features/game/gameSlice";

export const Game: FC<{}> = () => {
  // Hooks
  const view = useAppSelector(selectView);

  return (
    <>
      {view === "menu" && <Menu />}
      {view === "town" && <Overview />}
    </>
  );
};
