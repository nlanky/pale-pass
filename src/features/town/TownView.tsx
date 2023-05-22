// REACT
import type { FC } from "react";

// LOCAL FILES
// Hooks
import { useEventTimer } from "features/event/hooks";
import { useTurnTimer } from "features/game/hooks";
import { usePlayerResourcesPerTurn } from "features/resource/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { useAppSelector } from "features/redux/hooks";
import { selectPlayerResources } from "features/town/townSlice";

export const TownView: FC<{}> = () => {
  // Hooks
  useTurnTimer();
  useEventTimer();
  const resources = useAppSelector(selectPlayerResources);
  const resourcesPerTurn = usePlayerResourcesPerTurn();

  // Derived variables
  const resourceNames = Object.keys(resources) as Resource[];

  return (
    <>
      <h1>Pale Pass</h1>
      {resourceNames.map((resource) => (
        <div key={resource}>
          <span style={{ marginRight: 5 }}>{resource}</span>
          <span style={{ marginRight: 5 }}>
            {resources[resource]}
          </span>
          <span>(+{resourcesPerTurn[resource]})</span>
        </div>
      ))}
    </>
  );
};
