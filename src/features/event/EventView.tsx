// REACT
import { FC, useState } from "react";

// LOCAL FILES
// Interfaces & Types
import type { Outcome } from "features/event/types";
// Redux
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
import {
  completeEvent,
  selectActiveEvent,
} from "features/event/eventSlice";
import { setView } from "features/game/gameSlice";

export const EventView: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const event = useAppSelector(selectActiveEvent);

  // Local state
  const [eventOutcome, setEventOutcome] = useState<Outcome | null>(
    null,
  );

  if (!event) {
    // Something has gone badly wrong
    dispatch(setView("town"));
    return null;
  }

  // Handlers
  const onChoiceClick = (outcomes: Outcome[]) => {
    const roll = Math.random();
    let cumulativeProbability = 0;
    for (const outcome of outcomes) {
      cumulativeProbability += outcome.probability;
      if (roll < cumulativeProbability) {
        setEventOutcome(outcome);
        break;
      }
    }
  };

  const returnToTown = () => {
    dispatch(setView("town"));
    dispatch(completeEvent(eventOutcome as Outcome));
  };

  return (
    <div>
      <p>{event.introductionText}</p>
      {event.choices.map((choice, index) => (
        <button
          key={index}
          disabled={eventOutcome !== null}
          onClick={() => {
            onChoiceClick(choice.outcomes);
          }}
          style={{
            borderColor: choice.outcomes
              .map((outcome) => outcome.text)
              .includes(eventOutcome?.text || "")
              ? "blue"
              : "#736b5e",
          }}
        >
          {choice.text}
        </button>
      ))}
      {eventOutcome && (
        <>
          <p>{eventOutcome.text}</p>
          <button onClick={returnToTown}>Return to town</button>
        </>
      )}
    </div>
  );
};
