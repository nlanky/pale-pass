export type SecondPersonPronounGender = "neuterYou" | "neuterIt";

export type ThirdPersonPronounGender =
  | "masculine"
  | "feminine"
  | "neuter"
  | "epicene";

export interface PersonalPronouns {
  subject: string;
  object: string;
  dependentPossessive: string;
  independentPossessive: string;
  reflexiveSingular: string;
  reflexivePlural: string;
}

export interface Pronouns {
  second: PersonalPronouns[];
  third: PersonalPronouns[];
}
