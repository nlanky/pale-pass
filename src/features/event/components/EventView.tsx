// REACT
import { useEffect, useState } from "react";
import type { FC } from "react";

// PUBLiC MODULES
import { Grid } from "@mui/material";

// LOCAL FILES
// Components
import {
  PlaceholderText,
  ReturnToTownButton,
  StyledButton,
  StyledContainer,
} from "features/common/components";
import { EventOutcome } from "features/event/components";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { Choice, Outcome } from "features/event/types";
// Redux
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
  const [eventChoice, setEventChoice] = useState<Choice | null>(null);
  const [eventOutcome, setEventOutcome] = useState<Outcome | null>(
    null,
  );

  if (!event) {
    // Something has gone badly wrong
    dispatch(setView("town"));
    return null;
  }

  // Handlers
  const onChoiceClick = (choice: Choice) => {
    setEventChoice(choice);
  };

  const onCompleteEvent = () => {
    if (eventChoice && eventOutcome) {
      dispatch(
        completeEvent({
          event,
          choice: eventChoice,
          outcome: eventOutcome,
        }),
      );
    }
  };

  // Effects
  useEffect(() => {
    if (eventChoice) {
      const roll = Math.random();
      let cumulativeProbability = 0;
      for (const outcome of eventChoice.outcomes) {
        cumulativeProbability += outcome.probability;
        if (roll < cumulativeProbability) {
          setEventOutcome(outcome);
          break;
        }
      }
    }
  }, [eventChoice]);

  return (
    <StyledContainer>
      <Grid container direction="column">
        <PlaceholderText
          text={event.introductionText}
          variant="body2"
        />
        <Grid item sx={{ mx: 0, my: 1, width: "100%" }}>
          <img src={event.image} style={{ maxWidth: "100%" }} />
        </Grid>
        <Grid
          container
          item
          justifyContent="space-between"
          spacing={2}
          wrap="nowrap"
        >
          {event.choices.map((choice, index) => (
            <Grid key={index} item xs={6}>
              <StyledButton
                disabled={eventOutcome !== null}
                fullWidth
                onClick={() => {
                  onChoiceClick(choice);
                }}
                sx={{
                  border: 2,
                  borderColor:
                    eventChoice?.text === choice.text
                      ? "parchmentDark.main"
                      : "transparent",
                }}
                variant="contained"
              >
                {choice.text}
              </StyledButton>
            </Grid>
          ))}
        </Grid>
        {eventOutcome && (
          <>
            <EventOutcome outcome={eventOutcome} />
            <ReturnToTownButton
              onClick={onCompleteEvent}
              sx={{ mt: 1 }}
            />
          </>
        )}
      </Grid>
    </StyledContainer>
  );
};
