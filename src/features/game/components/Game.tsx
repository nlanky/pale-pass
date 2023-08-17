// REACT
import type { FC } from "react";

// LOCAL FILES
// Components
import { TownBuildings } from "features/building/components";
import { TownCombat } from "features/combat/components";
import { EventView } from "features/event/components";
import { Log } from "features/log/components";
import { Map } from "features/map/components";
import { Menu } from "features/menu/Menu";
import { CreateCharacter } from "features/player/components";
import { TownView } from "features/town/components";
import { Introduction } from "features/tutorial/Introduction";
import { TownVillagers } from "features/villager/components";
// Redux
import { useAppSelector } from "features/redux/hooks";
import { selectView } from "features/game/selectors";

export const Game: FC<{}> = () => {
  // Hooks
  const view = useAppSelector(selectView);

  return (
    <>
      {view === "menu" && <Menu />}
      {view === "introduction" && <Introduction />}
      {view === "createCharacter" && <CreateCharacter />}
      {view === "town" && <TownView />}
      {view === "map" && <Map />}
      {view === "event" && <EventView />}
      {view === "building" && <TownBuildings />}
      {view === "villager" && <TownVillagers />}
      {view === "combat" && <TownCombat />}
      {view === "log" && <Log />}
    </>
  );
};
