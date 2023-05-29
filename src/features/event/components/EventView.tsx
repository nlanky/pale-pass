// REACT
import { useState } from "react";
import type { FC } from "react";

// PUBLiC MODULES
import { Grid, Typography, useTheme } from "@mui/material";

// LOCAL FILES
// Components
import {
  StyledButton,
  StyledContainer,
} from "features/common/components";
import { EventOutcome } from "features/event/components";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { Outcome } from "features/event/types";
// Redux
import {
  completeEvent,
  selectActiveEvent,
} from "features/event/eventSlice";
import { setView } from "features/game/gameSlice";

export const EventView: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
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
    <StyledContainer>
      <Grid container direction="column">
        <Typography variant="body2">
          {event.introductionText}
        </Typography>
        <Grid item sx={{ margin: theme.spacing(1, 0) }}>
          <img src={event.image} />
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
                  onChoiceClick(choice.outcomes);
                }}
                sx={{
                  border: choice.outcomes
                    .map((outcome) => outcome.text)
                    .includes(eventOutcome?.text || "")
                    ? `2px solid ${theme.palette.parchmentDark.main}`
                    : "2px solid transparent",
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
            <StyledButton
              onClick={returnToTown}
              sx={{ marginTop: theme.spacing(1) }}
              variant="contained"
            >
              Return to town
            </StyledButton>
          </>
        )}
      </Grid>
    </StyledContainer>
  );
};
