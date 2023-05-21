// REACT
import type { FC } from "react";

// LOCAL FILES
// Hooks
import { useTurnTimer } from "features/game/hooks";
// Redux
import { useAppSelector } from "features/redux/hooks";
import { selectPlayerResources } from "features/town/townSlice";

export const Overview: FC<{}> = () => {
  // Hooks
  useTurnTimer();
  const resources = useAppSelector(selectPlayerResources);

  return (
    <>
      <h1>Pale Pass</h1>
      <p>{JSON.stringify(resources)}</p>
    </>
  );
};
