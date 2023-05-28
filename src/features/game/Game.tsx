// REACT
import type { FC } from "react";

// LOCAL FILES
// Components
import { TownBuildings } from "features/building/components";
import { EventView } from "features/event/components";
import { Introduction } from "features/tutorial/Introduction";
import { Menu } from "features/menu/Menu";
import { TownView } from "features/town/components";
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
      {view === "building" && <TownBuildings />}
    </>
  );
};
