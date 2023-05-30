// REACT
import type { FC } from "react";

// LOCAL FILES
// Components
import { TownBuildings } from "features/building/components";
import { EventView } from "features/event/components";
import { Introduction } from "features/tutorial/Introduction";
import { Menu } from "features/menu/Menu";
import { CreateCharacter } from "features/player/components";
import { TownView } from "features/town/components";
import { TownVillagers } from "features/villager/components";
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
      {view === "createCharacter" && <CreateCharacter />}
      {view === "town" && <TownView />}
      {view === "event" && <EventView />}
      {view === "building" && <TownBuildings />}
      {view === "villager" && <TownVillagers />}
    </>
  );
};
