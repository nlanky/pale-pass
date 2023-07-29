// REACT
import { useState } from "react";
import type { FC, ChangeEvent } from "react";

// PUBLIC MODULES
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";

// LOCAL FILES
// Components
import {
  StyledButton,
  StyledContainer,
} from "features/common/components";
// Constants
import {
  PRONOUN_GENDER_TO_SECOND_PERSON_PRONOUNS,
  PRONOUN_GENDER_TO_THIRD_PERSON_PRONOUNS,
} from "features/player/constants";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Interfaces & Types
import type {
  SecondPersonPronounGender,
  ThirdPersonPronounGender,
} from "features/player/types";
// Redux
import { setNameAndPronouns } from "features/player/actions";

export const CreateCharacter: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Local state
  const [name, setName] = useState("");
  const [secondPersonPronouns, setSecondPersonPronouns] = useState<
    SecondPersonPronounGender[]
  >([]);
  const [thirdPersonPronouns, setThirdPersonPronouns] = useState<
    ThirdPersonPronounGender[]
  >([]);
  const [error, setError] = useState(false);

  // Handlers
  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO: Do we need validation?
    setError(false);
    setName(event.target.value);
  };

  const onSecondPersonPronounChange = (
    pronounGender: SecondPersonPronounGender,
    checked: boolean,
  ) => {
    setError(false);

    const nextSecondPersonPronouns: SecondPersonPronounGender[] = [
      ...secondPersonPronouns,
    ];
    if (checked) {
      nextSecondPersonPronouns.push(pronounGender);
    } else {
      const secondPersonPronounsIndex =
        nextSecondPersonPronouns.findIndex(
          (secondPersonPronounGender) =>
            secondPersonPronounGender === pronounGender,
        );
      if (secondPersonPronounsIndex !== -1) {
        nextSecondPersonPronouns.splice(secondPersonPronounsIndex, 1);
      }
    }

    setSecondPersonPronouns(nextSecondPersonPronouns);
  };

  const onThirdPersonPronounChange = (
    pronounGender: ThirdPersonPronounGender,
    checked: boolean,
  ) => {
    setError(false);

    const nextThirdPersonPronouns: ThirdPersonPronounGender[] = [
      ...thirdPersonPronouns,
    ];
    if (checked) {
      nextThirdPersonPronouns.push(pronounGender);
    } else {
      const thirdPersonPronounsIndex =
        nextThirdPersonPronouns.findIndex(
          (thirdPersonPronounGender) =>
            thirdPersonPronounGender === pronounGender,
        );
      if (thirdPersonPronounsIndex !== -1) {
        nextThirdPersonPronouns.splice(thirdPersonPronounsIndex, 1);
      }
    }

    setThirdPersonPronouns(nextThirdPersonPronouns);
  };

  const onStartGame = () => {
    if (
      name.length === 0 ||
      secondPersonPronouns.length === 0 ||
      thirdPersonPronouns.length === 0
    ) {
      setError(true);
      return;
    }

    dispatch(
      setNameAndPronouns({
        name,
        pronouns: {
          second: secondPersonPronouns.map(
            (secondPersonPronounGender) =>
              PRONOUN_GENDER_TO_SECOND_PERSON_PRONOUNS[
                secondPersonPronounGender
              ],
          ),
          third: thirdPersonPronouns.map(
            (thirdPersonPronounGender) =>
              PRONOUN_GENDER_TO_THIRD_PERSON_PRONOUNS[
                thirdPersonPronounGender
              ],
          ),
        },
      }),
    );
  };

  return (
    <StyledContainer>
      <Typography component="h1" sx={{ mb: 1 }} variant="h4">
        Create Your Character
      </Typography>
      <Typography component="h2" sx={{ mt: 1 }} variant="h5">
        Name
      </Typography>
      <TextField
        color="parchmentDark"
        onChange={onNameChange}
        required
        value={name}
      />
      <Typography component="h2" sx={{ mt: 1 }} variant="h5">
        Pronouns
      </Typography>
      <Typography variant="body2">
        Choose all that apply for each person
      </Typography>
      <Typography component="h3" sx={{ mt: 1 }} variant="h6">
        2nd Person
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={secondPersonPronouns.includes("neuterYou")}
              color="parchmentDark"
              onChange={(event) => {
                onSecondPersonPronounChange(
                  "neuterYou",
                  event.target.checked,
                );
              }}
            />
          }
          label="you / your / yours / yourself / yourselves"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={secondPersonPronouns.includes("neuterIt")}
              color="parchmentDark"
              onChange={(event) => {
                onSecondPersonPronounChange(
                  "neuterIt",
                  event.target.checked,
                );
              }}
            />
          }
          label="it / its / itself"
        />
      </FormGroup>
      <Typography component="h3" sx={{ mt: 1 }} variant="h6">
        3rd Person
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={thirdPersonPronouns.includes("masculine")}
              color="parchmentDark"
              onChange={(event) => {
                onThirdPersonPronounChange(
                  "masculine",
                  event.target.checked,
                );
              }}
            />
          }
          label="he / him / his / himself"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={thirdPersonPronouns.includes("feminine")}
              color="parchmentDark"
              onChange={(event) => {
                onThirdPersonPronounChange(
                  "feminine",
                  event.target.checked,
                );
              }}
            />
          }
          label="she / her / hers / herself"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={thirdPersonPronouns.includes("neuter")}
              color="parchmentDark"
              onChange={(event) => {
                onThirdPersonPronounChange(
                  "neuter",
                  event.target.checked,
                );
              }}
            />
          }
          label="it / its / itself"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={thirdPersonPronouns.includes("epicene")}
              color="parchmentDark"
              onChange={(event) => {
                onThirdPersonPronounChange(
                  "epicene",
                  event.target.checked,
                );
              }}
            />
          }
          label="they / them / their / theirs / themself / themselves"
        />
      </FormGroup>
      <StyledButton onClick={onStartGame} sx={{ mt: 1 }}>
        Start Game
      </StyledButton>
      {error && (
        <Typography color="error" sx={{ mt: 1 }} variant="body2">
          Please enter a name and at least one choice for your 2nd and
          3rd person pronouns
        </Typography>
      )}
    </StyledContainer>
  );
};
