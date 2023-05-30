import { FC } from "react";
import { Typography, TypographyProps } from "@mui/material";
import {
  selectPlayerName,
  selectPlayerPronouns,
} from "features/player/playerSlice";
import { useAppSelector } from "features/redux/hooks";

interface PlaceholderTextProps extends TypographyProps {
  text: string;
}

/**
 * Use when we need to replace templated parts of text e.g. event text
 */
export const PlaceholderText: FC<PlaceholderTextProps> = ({
  ...props
}) => {
  let { text } = props;

  // Hooks
  const playerName = useAppSelector(selectPlayerName);
  const { second, third } = useAppSelector(selectPlayerPronouns);

  // Derived variables
  const secondPersonPronouns =
    second[Math.floor(Math.random() * second.length)];
  const thirdPersonPronouns =
    third[Math.floor(Math.random() * third.length)];
  text = text
    .replace(/{player.name}/g, playerName)
    .replace(/{second.subject}/g, secondPersonPronouns.subject)
    .replace(/{second.object}/g, secondPersonPronouns.object)
    .replace(
      /{second.dependentPossessive}/g,
      secondPersonPronouns.dependentPossessive,
    )
    .replace(
      /{second.independentPossessive}/g,
      secondPersonPronouns.independentPossessive,
    )
    .replace(
      /{second.reflexiveSingular}/g,
      secondPersonPronouns.reflexiveSingular,
    )
    .replace(
      /{second.reflexivePlural}/g,
      secondPersonPronouns.reflexivePlural,
    )
    .replace(/{third.subject}/g, thirdPersonPronouns.subject)
    .replace(/{third.object}/g, thirdPersonPronouns.object)
    .replace(
      /{third.dependentPossessive}/g,
      thirdPersonPronouns.dependentPossessive,
    )
    .replace(
      /{third.independentPossessive}/g,
      thirdPersonPronouns.independentPossessive,
    )
    .replace(
      /{third.reflexiveSingular}/g,
      thirdPersonPronouns.reflexiveSingular,
    )
    .replace(
      /{third.reflexivePlural}/g,
      thirdPersonPronouns.reflexivePlural,
    );

  return (
    <Typography
      sx={{ ...props.sx, whiteSpace: "pre-line" }}
      {...props}
    >
      {text}
    </Typography>
  );
};
