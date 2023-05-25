// REACT
import { useState } from "react";
import type { FC } from "react";

// PUBLIC MODULES
import {
  Button,
  Container,
  Typography,
  useTheme,
} from "@mui/material";

// LOCAL FILES
// Constants
import { SCREEN_ID_TO_SCREEN } from "features/tutorial/constants";
// Redux
import { useAppDispatch } from "features/redux/hooks";
import { setView } from "features/game/gameSlice";

export const Introduction: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();

  // Local state
  const [screenId, setScreenId] = useState(1);

  // Derived variables
  const screen = SCREEN_ID_TO_SCREEN[screenId];
  const buttonText = screenId === 4 ? "Start Game" : "Next";

  // Handlers
  const advanceScreen = () => {
    // Last screen, start game!
    if (screenId === 4) {
      dispatch(setView("town"));
      return;
    }

    setScreenId(screenId + 1);
  };

  return (
    <Container maxWidth="lg">
      <Typography
        sx={{ marginBottom: theme.spacing(1) }}
        variant="body1"
      >
        {screen.text}
      </Typography>
      <Button onClick={advanceScreen} variant="contained">
        {buttonText}
      </Button>
    </Container>
  );
};
