// REACT
import { useState } from "react";
import type { FC } from "react";

// PUBLIC MODULES
import { Typography, useTheme } from "@mui/material";

// LOCAL FILES
// Components
import {
  StyledButton,
  StyledContainer,
} from "features/common/components";
// Constants
import { SCREEN_ID_TO_SCREEN } from "features/tutorial/constants";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Redux
import { setView } from "features/game/gameSlice";

export const Introduction: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();

  // Local state
  const [screenId, setScreenId] = useState(1);

  // Derived variables
  const screen = SCREEN_ID_TO_SCREEN[screenId];
  const buttonText = screenId === 4 ? "Create Character" : "Next";

  // Handlers
  const advanceScreen = () => {
    // Last screen, start game!
    if (screenId === 4) {
      dispatch(setView("createCharacter"));
      return;
    }

    setScreenId(screenId + 1);
  };

  return (
    <StyledContainer>
      <Typography
        sx={{ marginBottom: theme.spacing(1) }}
        variant="body2"
      >
        {screen.text}
      </Typography>
      <StyledButton onClick={advanceScreen} variant="contained">
        {buttonText}
      </StyledButton>
    </StyledContainer>
  );
};
