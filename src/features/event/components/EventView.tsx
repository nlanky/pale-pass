// REACT
import { useEffect, useState } from "react";
import type { FC } from "react";

// PUBLiC MODULES
import { Divider, Grid, Typography, useTheme } from "@mui/material";

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
import { completeEvent } from "features/event/actions";
import { selectActiveEvent } from "features/event/eventSlice";
import { setView } from "features/game/actions";

export const EventView: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
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
    <StyledContainer sx={{ overflowY: "auto" }}>
      <PlaceholderText
        text={event.introductionText}
        variant="body2"
      />
      <Grid item sx={{ mt: 1 }}>
        <img src={event.image} style={{ maxWidth: "100%" }} />
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid
        container
        item
        justifyContent="space-between"
        wrap="nowrap"
      >
        {event.choices.map((choice, index) => {
          const isSelected = eventChoice?.text === choice.text;

          return (
            <Grid
              key={index}
              container
              direction="column"
              item
              sx={{
                border: isSelected ? 2 : 0,
                borderColor: "parchmentDark.main",
                borderStyle: "ridge",
                mr: 2,
                padding: eventOutcome ? 1 : 0,
              }}
              xs={6}
            >
              <Typography fontWeight="bold" variant="body2">
                Choice {index + 1}
              </Typography>
              <PlaceholderText text={choice.text} variant="body2" />
              <StyledButton
                disabled={eventOutcome !== null}
                nineSliceStyles={{
                  container: {
                    marginTop: theme.spacing(1),
                  },
                }}
                onClick={() => {
                  onChoiceClick(choice);
                }}
                width={100}
              >
                Choose
              </StyledButton>
            </Grid>
          );
        })}
      </Grid>
      {eventOutcome && (
        <>
          <Divider sx={{ my: 1 }} />
          <EventOutcome outcome={eventOutcome} />
          <ReturnToTownButton
            nineSliceStyles={{
              container: {
                marginTop: theme.spacing(1),
              },
            }}
            onClick={onCompleteEvent}
          />
        </>
      )}
    </StyledContainer>
  );
};
