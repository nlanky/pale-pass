// REACT
import { useEffect, useState } from "react";
import type { FC } from "react";

// PUBLiC MODULES
import { Divider, Grid, Typography, useTheme } from "@mui/material";

// LOCAL FILES
// Components
import {
  Image,
  PlaceholderText,
  ReturnToTownButton,
  StyledButton,
  StyledContainer,
} from "features/common/components";
import { EventOutcome } from "features/event/components";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Redux
import { completeEvent } from "features/event/actions";
import { selectActiveEvent } from "features/event/selectors";

export const EventView: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const event = useAppSelector(selectActiveEvent);

  // Local state
  const [choiceIndex, setChoiceIndex] = useState<number | null>(null);
  const [outcomeIndex, setOutcomeIndex] = useState<number | null>(
    null,
  );

  // Derived variables
  const choices = event.choices;
  const eventChoice = choices[choiceIndex ?? NaN];
  const eventOutcome = eventChoice?.outcomes[outcomeIndex ?? NaN];

  // Handlers
  const onChoiceClick = (choiceIndex: number) => {
    setChoiceIndex(choiceIndex);
  };

  const onCompleteEvent = () => {
    if (choiceIndex !== null && outcomeIndex !== null) {
      dispatch(
        completeEvent({
          id: event.id,
          choiceIndex,
          outcomeIndex,
        }),
      );
    }
  };

  // Effects
  useEffect(() => {
    if (choiceIndex !== null) {
      const roll = Math.random();
      let cumulativeProbability = 0;
      for (const [index, outcome] of eventChoice.outcomes.entries()) {
        cumulativeProbability += outcome.probability;
        if (roll < cumulativeProbability) {
          setOutcomeIndex(index);
          break;
        }
      }
    }
  }, [choiceIndex]);

  return (
    <StyledContainer sx={{ overflowY: "auto" }}>
      <PlaceholderText
        text={event.introductionText}
        variant="body2"
      />
      <Grid item sx={{ mt: 1 }}>
        <Image src={event.image} style={{ maxWidth: "100%" }} />
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid
        container
        item
        justifyContent="space-between"
        wrap="nowrap"
      >
        {event.choices.map((choice, index) => {
          const isSelected = index === choiceIndex;

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
                padding: outcomeIndex !== null ? 1 : 0,
              }}
              xs={6}
            >
              <Typography fontWeight="bold" variant="body2">
                Choice {index + 1}
              </Typography>
              <PlaceholderText text={choice.text} variant="body2" />
              <StyledButton
                disabled={outcomeIndex !== null}
                nineSliceStyles={{
                  container: {
                    marginTop: theme.spacing(1),
                  },
                }}
                onClick={() => {
                  onChoiceClick(index);
                }}
                width={100}
              >
                Choose
              </StyledButton>
            </Grid>
          );
        })}
      </Grid>

      {outcomeIndex !== null && (
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
