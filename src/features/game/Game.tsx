// LOCAL FILES
// Components
import { Menu } from "features/menu/Menu";
import { TurnTimer } from "features/game/TurnTimer";
import { Overview } from "features/town/Overview";
// Redux
import { useAppSelector } from "features/redux/hooks";
import { selectView } from "features/game/gameSlice";

export const Game = () => {
  // Hooks
  const view = useAppSelector(selectView);

  return (
    <>
      {view === "menu" && <Menu />}
      {view === "town" && (
        <>
          <TurnTimer />
          <Overview />
        </>
      )}
    </>
  )
};
