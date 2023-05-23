// REACT
import type { FC } from "react";

// LOCAL FILES
// Components
import { EventView } from "features/event/EventView";
import { Introduction } from "features/tutorial/Introduction";
import { Menu } from "features/menu/Menu";
import { TownView } from "features/town/TownView";
// Redux
import { useAppSelector } from "features/redux/hooks";
import { selectView } from "features/game/gameSlice";

export const Game: FC<{}> = () => {
  // Hooks
  const view = useAppSelector(selectView);

  return (
    <>
      {view === "menu" && <Menu />}
      {view === "introduction" && <Introduction />}
      {view === "town" && <TownView />}
      {view === "event" && <EventView />}
    </>
  );
};
