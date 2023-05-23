// REACT
import type { FC } from "react";

// LOCAL FILES
// Hooks
import { useEventTimer, useValidEvents } from "features/event/hooks";
import { useTurnTimer } from "features/game/hooks";
import { usePlayerResourcesPerTurn } from "features/resource/hooks";
import { useCanAdvanceTier } from "features/town/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
import { triggerEvent } from "features/event/eventSlice";
import {
  advanceTier,
  selectEnabledResources,
  selectPlayerResources,
} from "features/town/townSlice";
// Utility functions
import { getRandomEvent } from "features/event/utils";

export const TownView: FC<{}> = () => {
  // Hooks
  useTurnTimer();
  useEventTimer();
  const dispatch = useAppDispatch();
  const resources = useAppSelector(selectPlayerResources);
  const resourcesPerTurn = usePlayerResourcesPerTurn();
  const enabledResources = useAppSelector(selectEnabledResources);
  const validEvents = useValidEvents();
  const canAdvanceTier = useCanAdvanceTier();

  // Derived variables
  const resourceNames = (Object.keys(resources) as Resource[]).filter(
    (resource) => enabledResources.includes(resource),
  );

  // Handlers
  const onEventTrigger = () => {
    // TODO: Need to prevent user triggering this as often as they want, 1 per 12 turns perhaps?
    dispatch(triggerEvent(getRandomEvent(validEvents)));
  };

  const onAdvanceTier = () => {
    dispatch(advanceTier());
  };

  // TODO: Allow RPT number to show a negative
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
      <button
        disabled={validEvents.length === 0}
        onClick={onEventTrigger}
      >
        Explore
      </button>
      <button disabled={!canAdvanceTier} onClick={onAdvanceTier}>
        Advance Tier
      </button>
    </>
  );
};
