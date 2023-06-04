// LOCAL FILES
// Interfaces & Types
import type {
  PersonalPronouns,
  SecondPersonPronounGender,
  ThirdPersonPronounGender,
} from "features/player/types";

export const PRONOUN_GENDER_TO_SECOND_PERSON_PRONOUNS: Record<
  SecondPersonPronounGender,
  PersonalPronouns
> = {
  neuterYou: {
    subject: "you",
    object: "you",
    dependentPossessive: "your",
    independentPossessive: "yours",
    reflexiveSingular: "yourself",
    reflexivePlural: "yourselves",
  },
  neuterIt: {
    subject: "it",
    object: "it",
    dependentPossessive: "its",
    independentPossessive: "its",
    reflexiveSingular: "itself",
    reflexivePlural: "itself",
  },
};

export const PRONOUN_GENDER_TO_THIRD_PERSON_PRONOUNS: Record<
  ThirdPersonPronounGender,
  PersonalPronouns
> = {
  masculine: {
    subject: "he",
    object: "him",
    dependentPossessive: "his",
    independentPossessive: "his",
    reflexiveSingular: "himself",
    reflexivePlural: "himself",
  },
  feminine: {
    subject: "she",
    object: "her",
    dependentPossessive: "her",
    independentPossessive: "hers",
    reflexiveSingular: "herself",
    reflexivePlural: "herself",
  },
  neuter: {
    subject: "it",
    object: "it",
    dependentPossessive: "its",
    independentPossessive: "its",
    reflexiveSingular: "itself",
    reflexivePlural: "itself",
  },
  epicene: {
    subject: "they",
    object: "them",
    dependentPossessive: "their",
    independentPossessive: "theirs",
    reflexiveSingular: "themself",
    reflexivePlural: "themselves",
  },
};

export const PLAYER_ID = 1;
